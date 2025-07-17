import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
//import TodoSummary from "../components/TodoSummary";
import useTodos from "../hooks/useTodos";

export default function TodoPage() {
    const token = localStorage.getItem('token')
    const { todos, addTodo, setTodoCompleted } = useTodos(token);

    return (
        <main className="h-screen space-y-13 overflow-y-auto bg-gradient-to-b from-desert-sand to-orange-300">
            <div className="py-18" >
                <h1 className="font-medium text-3xl text-center text-dark-blue tracking-widest text-shadow-slate-700">Your To-do's</h1>
            </div >
            <div className="max-w-lg mx-auto bg-desert-sand rounded-md p-5 space-y-6 shadow-lg shadow-slate-700">
                <AddTodoForm onSubmit={addTodo}/>
                <TodoList
                    todos={todos}
                    onCompletedChange={setTodoCompleted}
                />
            </div>
            {/*
                todos.length > 0 && (
                    <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos} />
                )*/
               <div></div>
            }
        </main >
    )
}