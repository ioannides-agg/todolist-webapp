import { Key, User } from "lucide-react";
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="flex flex-col space-y-5  pr-6">
            <div className="flex items-center gap-4">
                <User />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="rounded-lg grow border p-2 border-orange-800 bg-orange-200 hover:bg-orange-100 text-slate-600 transition-colors duration-600"
                />
            </div>
            <div className="flex items-center gap-4">
                <Key />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="rounded-lg grow border p-2 border-orange-800 bg-orange-200 hover:bg-orange-100 text-slate-600 transition-colors duration-600"
                />
            </div>

            <button
                className="self-center w-32 h-8 rounded-md bg-blue-900 hover:bg-blue-800 text-orange-200 transition-colors duration-600 font-medium"
            >
                Login
            </button>
        </form>
    );
}