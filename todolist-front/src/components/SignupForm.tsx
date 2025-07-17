import { Key, User } from "lucide-react";
import { useState } from "react";
import type { SignupRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";

interface SignupFormProps {
    onSubmit: (data: SignupRequest) => void;
    error: string;
}

export default function SignupForm({ onSubmit, error }: SignupFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if (!email.trim() || !password.trim()) return;

        const d : SignupRequest = {email: email, password: password};
        onSubmit(d);

        if (error !== '') navigate('/Login/')
    }

    return (
        <>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2">
                    <User />
                    </span>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="rounded-lg w-full pl-10 border p-2 border-orange-800 bg-orange-200 hover:bg-orange-100 text-slate-600 transition-colors duration-600 h-12"
                    />
                </div>
                <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2">
                    <Key />
                    </span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="rounded-lg w-full pl-10 border p-2 border-orange-800 bg-orange-200 hover:bg-orange-100 text-slate-600 transition-colors duration-600 h-12"
                    />
                </div>

                <button
                    className="self-center w-32 h-10 rounded-md bg-blue-900 hover:bg-blue-800 text-orange-200 transition-colors duration-600 font-medium"
                >
                    Sign up
                </button>
            </form>
            {error !== '' && (<p>{error}</p>)}
        </>
    );
}