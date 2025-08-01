import { useEffect, useState } from "react"
//import { dummyData } from "../data/todos"
import type { Todo } from "../types/todo";
import axios from 'axios';
import { axiosInstance } from "./useAuth";

export default function useTodos(token: string | null) {
      const [todos, setTodos] = useState<Todo[] | null>(null);
    
        useEffect(() => {
          const fetchTodos = async () => {
            if (!token) {
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
            const res = await axiosInstance.get<Todo[]>('http://localhost:3001/api/todo/retrieve', {
                headers: { authorization: `Bearer ${token}`}
            })

            setTodos(res.data);
        } catch {
            setTodos(null);
        }
      }

      const addTodo = async (title: string): Promise<void> => {
        try {
          const res = await axiosInstance.post<Todo>('http://localhost:3001/api/todo/add', {title}, 
            {headers: { authorization: `Bearer ${token}`}});

          if (!res) return;
          setTodos((prevTodos) => prevTodos? [
            res.data,
            ...prevTodos
          ] : [res.data]);
        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error)
            } else {
              console.log(error)
            }
        }
      }


      const setTodoCompleted = async (id: number, completed: boolean): Promise<void> => {
        try {
          const payload = {
            todoId: id,
            state: completed
          }
          await axiosInstance.put('http://localhost:3001/api/todo/update', {payload}, 
            {headers: { authorization: `Bearer ${token}`}});
          
          setTodos((prevTodos) => {
            if (!prevTodos) return prevTodos; 
            return prevTodos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
          }); //update the todo list object seperately to minimize read operations

        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error)
            } else {
              console.log(error)
            }
        }
      }

      const setTodoDeleted = async (id: number): Promise<void> => {
        try {
            await axiosInstance.delete('http://localhost:3001/api/todo/deleteOne', 
            {headers: { authorization: `Bearer ${token}` },
             data: { id }
            });

          setTodos((prevTodos) => {
            if(!prevTodos) return prevTodos;

            return prevTodos.filter((todo) => todo.id !== id)
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error)
          } else {
            console.log(error)
          }
        }
      }

      const deleteAllCompletedTodos = async (): Promise<void> => {
        try {
          await axiosInstance.delete('http://localhost:3001/api/todo/deleteMany', 
            {headers: { authorization: `Bearer ${token}` }});

          setTodos((prevTodos) => {
            if(!prevTodos) return prevTodos;
            
            return prevTodos.filter((todo) => !todo.completed)
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error)
          } else {
            console.log(error)
          }
        }
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
        setTodoCompleted,
        setTodoDeleted,
        deleteAllCompletedTodos
      }
}