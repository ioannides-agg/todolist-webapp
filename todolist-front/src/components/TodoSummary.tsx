import type { Todo } from "../types/todo";

interface TodoSummaryProps {
    todos: Todo[];
    deleteAllCompleted: () => void
}

export default function TodoSummary({ todos, deleteAllCompleted }: TodoSummaryProps) {
    const completed = todos.filter(todo => todo.completed);

    return (
        <div className="text-center space-y-2">
            <p className="text-sm font-medium text-dark-blue">
                {completed.length} / {todos.length} completed!
            </p>

            {completed.length > 0 && (
                <button
                    onClick={deleteAllCompleted}
                    className="text-red-700 hover:underline text-sm font-bold"
                >
                    Delete all completed
                </button>
            )}
        </div>
    )
}