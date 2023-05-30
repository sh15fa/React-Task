import React, { useState } from "react";
import classes from './TodoList.module.css';
import Button from "../UI/Button";
import TasksList from "../TasksList/TasksList";

const TodoList = (props)=>{
const [taskes, setTaskes] = useState([]);
async function fetchAllTasks(){
    const response=await fetch('https://react-task-master-default-rtdb.firebaseio.com/tasks.json');
        const data=await response.json();
        const loadedTasks=[];
        for(const key in data){
            loadedTasks.push({
                id:key,
                title:data[key].title,
                done:data[key].done,

            })
        }
        setTaskes(loadedTasks);
        console.log(taskes);
}
function handleDoneTask(id){
    const filteredItems = taskes.map(item => {
			item.id === id && (item.done = !item.done)
			return item
		})

		setTaskes(filteredItems);
        console.log(taskes);
  }

    const divBtn= classes.divBtn;
    return <div>
        <h1>TodoList</h1>
        <div className={classes.todoList}>
            <div className={divBtn}><Button onClick={fetchAllTasks}>All</Button></div>
            <div className={divBtn}><Button>Done</Button></div>
            <div className={divBtn}><Button>Todo</Button></div>
        </div>
        {taskes.length>0 && <TasksList taskes={taskes} handleDoneTask={handleDoneTask}/>}
    </div>
};

export default TodoList;