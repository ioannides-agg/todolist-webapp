import { Trash2 } from "lucide-react";
import type { Todo } from "../types/todo"

interface TodoItemProps {
    todo: Todo;
    onCompletedChange: (id: number, completed: boolean) => void;
    onDeletedChange: (id: number) => void;
}

export default function TodoItem({ todo, onCompletedChange, onDeletedChange }: TodoItemProps) {
    return (
        <div className="flex items-center gap-1">
            <label className="flex items-center gap-2 border rounded-md p-2 border-orange-800 bg-orange-200 hover:bg-orange-100 grow text-slate-900">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => onCompletedChange(todo.id, e.target.checked)}
                    className="scale-125 bg-orange-50"
                />

                <span className={todo.completed ? "line-through text-slate-500" : ""}>
                    {todo.title}
                </span>
            </label>

            <button className="ml-auto" onClick={() => onDeletedChange(todo.id)}>
                <Trash2 size={20} className="text-slate-500" />
            </button>
        </div>
    )
}

