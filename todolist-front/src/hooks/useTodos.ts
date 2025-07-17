import { useEffect, useState } from "react"
//import { dummyData } from "../data/todos"
import type { Todo } from "../types/todo";
import axios from 'axios';

export default function useTodos(token: string | null) {
      const [todos, setTodos] = useState<Todo[] | null>(null);
    
        useEffect(() => {
          const fetchTodos = async () => {
            if (!token) {
              console.log("invalid token");
              return;
            }

            try {
              await getAllTodos(token);
            } catch (err) {
              console.error('Failed to load todos:', err);
            }
          };

          fetchTodos();
        }, [token]);

      const getAllTodos = async (token: string): Promise<void> => {
        try {
            const res = await axios.get<Todo[]>('http://localhost:3001/api/todo/retrieve', {
                headers: { authorization: `Bearer ${token}`}
            })

            setTodos(res.data);
        } catch {
            setTodos(null);
        }
      }

      const addTodo = async (title: string): Promise<void> => {
        const res = await axios.post<Todo>('http://localhost:3001/api/todo/add', {title}, {
                headers: { authorization: `Bearer ${token}`},
            });

        if (!res) return;
        setTodos((prevTodos) => prevTodos? [
          res.data,
          ...prevTodos
        ] : [res.data]);
      }
    
      /*function setTodoCompleted(id: number, completed: boolean) {
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
      }*/

      return {
        getAllTodos,
        todos,
        addTodo,
        //setTodoCompleted,
        //setTodoDeleted,
        //addTodo,
        //deleteAllCompletedTodos
      }
}