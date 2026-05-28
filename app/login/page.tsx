'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // stops browser's default form behavior (page reload)
        // login logic
        if (!email) { setError("Email required"); return; }
        if (!password) { setError("Password required"); return; }

        const { error } = await supabase.auth.signInWithPassword({email, password});
        if(error) {
            setError(error.message);
        } else {
            router.push("/map");        
        }
    }

    const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { error } = await supabase.auth.signUp({email, password});
        if (error) {
            setError(error.message);
        } else {
            setError("Check your email to confirm signup.");
        }
    }
    
    // onSubmit: listens for when form submitted
    // ={handleSubmit} --> run handleSubmit function   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                    {/*
                        (e) --> recieving event object when user types
                        e.target.value --> get text user just typed
                        setEmail --> updates `email` state with the text
                    */}
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {/*
                    {} --> tells JSX evaluate this JS expression
                    `error &&` --> if `error` true, run thing after &&
                    style={{}} --> inline css styling
                    {error} --> display actual error message
                */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="submit">Log In</button>
                <br />
                <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" type="button" onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    )
} 

/*
User clicks "Log In" button
    ↓
handleSubmit runs
    ↓
Prevents page reload with preventDefault()
    ↓
Validates email/password aren't empty
    ↓
Calls supabase.auth.signInWithPassword()
    ↓
If success → redirect to /map
If error → display error message
*/