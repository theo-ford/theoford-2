import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    try {
        // Debug: Check if environment variables are loaded
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY is not set");
            return new Response(JSON.stringify({ error: "Server configuration error: RESEND_API_KEY missing" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        if (!process.env.NOTIFY_EMAIL) {
            console.error("NOTIFY_EMAIL is not set");
            return new Response(JSON.stringify({ error: "Server configuration error: NOTIFY_EMAIL missing" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        const { firstName, lastName, email } = await req.json();

        console.log("Attempting to send email:", {
            to: process.env.NOTIFY_EMAIL,
            from: "Newsletter <onboarding@resend.dev>",
            hasApiKey: !!process.env.RESEND_API_KEY
        });

        const result = await resend.emails.send({
            from: "Newsletter <onboarding@resend.dev>",
            to: process.env.NOTIFY_EMAIL,
            subject: "New Newsletter Signup",
            text: `New signup:
            First Name: ${firstName}
            Last Name: ${lastName}
            Email: ${email}`,
        });

        console.log("Email send result:", result);

        // Check if Resend returned an error in the result
        if (result.error) {
            console.error("Resend API error:", result.error);
            return new Response(JSON.stringify({
                error: "Email failed",
                details: result.error.message || "Resend API error",
                resendError: result.error
            }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }

        return new Response(JSON.stringify({ success: true, result }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Email send error:", error);
        console.error("Error details:", {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        return new Response(JSON.stringify({
            error: "Email failed",
            details: error.message
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
