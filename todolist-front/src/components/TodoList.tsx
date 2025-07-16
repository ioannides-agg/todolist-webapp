import type { Todo } from "../types/todo"
import TodoItem from "./TodoItem";

interface TodoListProps {
    todos: Todo[] | null;
    /*onCompletedChange: (id: number, completed: boolean) => void;
    onDeletedChange: (id: number) => void;*/
}

export default function TodoList({ todos }: TodoListProps) {
    /*const todoSorted = todos.sort((a, b) => {
        if (a.completed === b.completed) {
            return b.id - a.id;
        }
        return a.completed ? 1 : -1;
    });*/

    return (
        <>
            <div className="space-y-2">
                {todos && todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo}/>
                ))}
            </div>
            {todos && todos.length === 0 && (
                <p className="text-center text-sm text-slate-600">
                    All done for today!
                </p>
            )}
        </>
    );
}