import SignupForm from "../components/SignupForm";
import { useAuth } from "../hooks/useAuth";
import LoaderOverlay from "../components/LoaderOverlay";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
        const {
            signup,
            error,
            loading,
            createdAccount
        } = useAuth();  // we dont need context here as the error and loading states here are exclusive to this page

        const nav = useNavigate();

        useEffect(() => {
            if (createdAccount) {
                nav("/");
            }
        }, [createdAccount, nav]);

    return (
        <main className="h-screen overflow-y-auto bg-gradient-to-b from-desert-sand to-orange-300">
            {loading && <LoaderOverlay/>}

            <div className="py-18">
                <h1 className="font-medium text-3xl text-center text-dark-blue tracking-widest text-shadow-slate-700">Sign up</h1>
            </div>
            <div className="max-w-lg mx-auto bg-desert-sand rounded-md p-10 space-y-6 shadow-lg shadow-slate-700">
                <SignupForm onSubmit={signup} error={error}/>
            </div>
        </main>
    )
}