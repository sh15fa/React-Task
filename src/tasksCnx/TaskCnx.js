import React from "react";

const TaskContext = React.createContext({
    tasks:[],
    deleteTask: (id)=>{},
    // updateTask:(id)=>{},
    // deleteTask: (id)=>{},
    // getDoneOrTodoTasks:()=>{},
    // deleteAllOrDoneTasks:()=>{}
    
});

export default TaskContext;