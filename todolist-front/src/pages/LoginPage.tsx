import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
    const {
        login,
        error,
    } = useAuth();

    return (
        <main className="h-screen overflow-y-auto bg-gradient-to-b from-desert-sand to-orange-300">
            <div className="py-18">
                <h1 className="font-medium text-3xl text-center text-dark-blue tracking-widest text-shadow-slate-700">Log in</h1>
            </div>
            <div className="max-w-lg mx-auto bg-desert-sand rounded-md p-10 space-y-6 shadow-lg shadow-slate-700">
                <LoginForm onSubmit={login} error={error} />
            </div>
        </main>
    )
}