import React, { Fragment } from "react";
import classes from './TodoInput.module.css';
import InputTask from "./InputTsak";

const TodoInput = ()=>{
    async function onAddTaskHandler(task){
        const response=await fetch('https://react-task-master-default-rtdb.firebaseio.com/tasks.json',
        {
          method:'POST',
          body:JSON.stringify(task),
         
        });
        const data=await response.json();
        console.log(data);
      }
    return <Fragment>
        <h1>TodoInput</h1>
        <section className={classes.addTask}>
           <InputTask onAddTask={onAddTaskHandler}/>
        </section>
    </Fragment>
};

export default TodoInput;