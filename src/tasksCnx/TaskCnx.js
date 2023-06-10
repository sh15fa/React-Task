import React from "react";

const TaskContext = React.createContext({
    tasks:[],
    deleteTask: (id)=>{},
    updateTask:(id)=>{},
    checkbox:(id)=>{},
    
    deleteAllOrDoneTasks:(bool)=>{}
    
});

export default TaskContext;