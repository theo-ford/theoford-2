"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

export default function NewsletterSignupPetrine() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    console.log("Test 2");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email) {
            setStatus("Please ensure all fields are filled.");
            return;
        }

        setStatus("Sending...");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Thanks for subscribing");
                setFormData({ firstName: "", lastName: "", email: "" });
            } else {
                console.error("API Error:", data);
                setStatus(`${data.error || "Something went wrong."}${data.details ? `: ${data.details}` : ""}`);
            }
        } catch (error) {
            console.error("Network error:", error);
            setStatus("Network error. Please check your connection.");
        }
    };

    return (
        <div className="font-serif mt-[100px] mb-[100px]">
            {!showForm ? (
                <p
                    onClick={() => setShowForm(true)}
                    className=""
                >
                    Newsletter
                </p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2  w-72"

                >
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        // required
                        className="border-b border-black"
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        // required
                        className="border-b border-black"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        //required
                        className="border-b border-black"
                    />
                    <button
                        type="submit"
                        className=" text-black text-left"
                    >
                        Submit
                        {/* {status || "Submit"} */}
                    </button>
                    {status && <p className="mt-2">{status}</p>}
                </form>
            )}
        </div>
    );
}
