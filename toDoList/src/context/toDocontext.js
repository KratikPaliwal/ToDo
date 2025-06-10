import {useContext, createContext} from 'react'

export const toDoContext = createContext({
    todos:[
        {
            id:1,
            todoMess:"First task",
            completed: false,
        },

    ],
    addToDo:(todoMess)=>{},
    updateTodo:(id,todoMess)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}

})

export const useToDo=()=>{
    return useContext(toDoContext)
}

export const ToDoProvider=toDoContext.Provider