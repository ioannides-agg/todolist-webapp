import { useEffect, useState } from "react"
import { dummyData } from "../data/todos"
import type { Todo } from "../types/todo";

export default function useTodos() {
      const [todos, setTodos] = useState(() => {
        const saved: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        return saved.length > 0 ? saved : dummyData;
      });
    
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);
    
      function setTodoCompleted(id: number, completed: boolean) {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)));
      }
    
      function setTodoDeleted(id: number) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    
      function addTodo(title: string) {
        setTodos((prevTodos) => [
          {
            id: Date.now(),
            title,
            completed: false
          },
          ...prevTodos
        ]);
      }
    
      function deleteAllCompletedTodos() {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
      }

      return {
        todos,
        setTodoCompleted,
        setTodoDeleted,
        addTodo,
        deleteAllCompletedTodos
      }
}