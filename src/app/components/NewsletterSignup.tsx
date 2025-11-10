"use client";

import { useState } from "react";

export default function NewsletterSignup() {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("✅ Thanks for subscribing!");
                setFormData({ firstName: "", lastName: "", email: "" });
            } else {
                console.error("API Error:", data);
                setStatus(`❌ ${data.error || "Something went wrong."}${data.details ? `: ${data.details}` : ""}`);
            }
        } catch (error) {
            console.error("Network error:", error);
            setStatus("❌ Network error. Please check your connection.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            {!showForm ? (
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Join Newsletter
                </button>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg shadow-md w-72"
                >
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                    {status && <p className="text-sm mt-2">{status}</p>}
                </form>
            )}
        </div>
    );
}
