import SignupForm from "../components/SignupForm";

export default function SignupPage() {
    return (
        <main className="h-screen overflow-y-auto bg-gradient-to-b from-desert-sand to-orange-300">
            <div className="py-18">
                <h1 className="font-medium text-3xl text-center text-dark-blue tracking-widest text-shadow-slate-700">Sign up</h1>
            </div>
            <div className="max-w-lg mx-auto bg-desert-sand rounded-md p-10 space-y-6 shadow-lg shadow-slate-700">
                <SignupForm/>
            </div>
        </main>
    )
}