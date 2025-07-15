import { useState } from "react"

interface AddTodoFormProps {
    onSubmit: (title: string) => void;
}

export default function AddTodoForm({ onSubmit }: AddTodoFormProps) {
    const [input, setInput] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!input.trim()) return;

        onSubmit(input);
        setInput("");
    }

    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="What needs to be done?"
                className="rounded-s-md grow border p-2 border-orange-800 bg-orange-200 hover:bg-orange-100 text-slate-600"
            />
            <button
                type="submit"
                className="w-16 rounded-e-md bg-blue-900 hover:bg-blue-800 text-orange-200"
            >
                Add
            </button>
        </form>
    );
}