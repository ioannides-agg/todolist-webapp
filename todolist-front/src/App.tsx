import { useState } from "react"
import { dummyData } from "./data/todos"
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(dummyData);

  function setTodoCompleted(id: number, completed: boolean) {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)));
  }

  function setTodoDeleted(id: number) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }

  function addTodo(title: string) {
    setTodos((prevTodos) => [
      {
        id: prevTodos.length + 1,
        title,
        completed: false
      },
      ...prevTodos
    ]);
  }

  return (
    <main className="py-10 h-screen space-y-5">
      <h1 className="font-bold text-3xl text-center">Your Todos</h1>
      <div className="max-w-lg mx-auto bg-slate-100 rounded-md p-5 space-y-6">
        <AddTodoForm onSubmit={addTodo} />
        <TodoList
          todos={todos}
          onCompletedChange={setTodoCompleted}
          onDeletedChange={setTodoDeleted}
        />
      </div>
    </main>
  )
}

export default App
