import { useState,useEffect } from "react";
import "./App.css";
import TodoForm from "./Components/ToDoForm";
import TodoItem from "./Components/ToDoItem";
import { ToDoProvider } from "./context/toDocontext";

function App() {
  const [todo, setTodo] = useState([]);

  const addToDo = (todoMess) => {
    setTodo((prev) => [{ id: Date.now(), ...todoMess }, ...prev]);
  };

  const updateToDo = (id, todoMess) => {
    setTodo((prev) =>
      prev.map((prevToDo) =>
        prevToDo.id === id ? { ...prevToDo, ...todoMess } : prevToDo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodo((prev) => prev.filter((todoMess) => todoMess.id !== id));
  };

  const toggleComplete=(id)=>{
    setTodo((prev)=>prev.map((prevToDo)=>prevToDo.id===id?{...prevToDo,completed:!prevToDo.completed}:prevToDo))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodo(todos)

    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todo))
  })


  return (
  
      <ToDoProvider value={{todo,addToDo, updateToDo, deleteTodo, toggleComplete }}>
        <div className="text-2xl text-white"></div>
        <div className="bg-[#3C3D37] min-h-screen py-8 w-full ">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">{/* Todo form goes here */}
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todo.map((todo)=>(
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo}/>

                </div>
              ))}
            </div>
          </div>
        </div>
        <TodoItem />
      </ToDoProvider>
  );
}

export default App;
