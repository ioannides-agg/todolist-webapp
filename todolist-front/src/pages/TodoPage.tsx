import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import TodoSummary from "../components/TodoSummary";
import useTodos from "../hooks/useTodos";

export default function TodoPage() {
    const { todos,
        setTodoCompleted,
        setTodoDeleted,
        addTodo,
        deleteAllCompletedTodos } = useTodos();

    return (
        <main className="bg-dark-blue h-screen space-y-5 overflow-y-auto">
            <div className="py-14 bg-desert-sand rounded-b-lg shadow-md shadow-gray-700 mask-b-from-0.5">
                <h1 className="font-mono font-medium text-3xl text-center text-dark-blue tracking-wider relative -top-4">Your Todo's</h1>
            </div>
            <div className="max-w-lg mx-auto bg-desert-sand rounded-md p-5 space-y-6 shadow-lg shadow-gray-700">
                <AddTodoForm onSubmit={addTodo} />
                <TodoList
                    todos={todos}
                    onCompletedChange={setTodoCompleted}
                    onDeletedChange={setTodoDeleted}
                />
            </div>
            {todos.length > 0 && (
                <TodoSummary todos={todos} deleteAllCompleted={deleteAllCompletedTodos} />
            )}
        </main>
    )
}