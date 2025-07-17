import { LogOut } from "lucide-react";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import useTodos from "../hooks/useTodos";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function TodoPage() {
    const { logout, accessToken } = useAuthContext();
    const { todos, addTodo, setTodoCompleted, setTodoDeleted, deleteAllCompletedTodos } = useTodos(accessToken);

    const nav = useNavigate();

    return (
        <main className="h-screen space-y-13 overflow-y-auto bg-gradient-to-b from-desert-sand to-orange-300">
            <div className="grid py-18 relative" >
                <LogOut className="absolute top-10 right-10 text-slate-700 hover:text-slate-900" onClick={() => {
                    nav('/');
                    logout();
                }}/>
                <h1 className="font-medium text-3xl text-center text-dark-blue tracking-widest text-shadow-slate-700">Your To-do's</h1>
            </div >
            <div className="max-w-lg mx-auto bg-desert-sand rounded-md p-5 space-y-6 shadow-lg shadow-slate-700">
                <AddTodoForm onSubmit={addTodo}/>
                <TodoList
                    todos={todos}
                    onCompletedChange={setTodoCompleted}
                    onDeletedChange={setTodoDeleted}
                />
            </div>
            {
                todos && todos.length > 0 && (
                    <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos} />
                )
            }
        </main >
    )
}