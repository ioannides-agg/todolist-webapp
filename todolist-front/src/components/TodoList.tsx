import type { Todo } from "../types/todo"
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[];
    onCompletedChange: (id: number, completed: boolean) => void;
    onDeletedChange: (id: number) => void;
}

export default function TodoList({ todos, onCompletedChange, onDeletedChange }: TodoListProps) {
    const todoSorted = todos.sort((a, b) => {
        if (a.completed === b.completed) {
            return b.id - a.id;
        }
        return a.completed ? 1 : -1;
    });

    return (
        <>
            <div className="space-y-2">
                {todoSorted.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onCompletedChange={onCompletedChange} onDeletedChange={onDeletedChange} />
                ))}
            </div>
            {todos.length === 0 && (
                <p className="text-center text-sm text-slate-600">
                    All done for today!
                </p>
            )}
        </>
    );
}