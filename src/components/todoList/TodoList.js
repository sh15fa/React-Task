import React from "react";
import classes from './TodoList.module.css';
import Button from "../UI/Button";

const TodoList = ()=>{
    const divBtn= classes.divBtn;
    return <div>
        <h1>TodoList</h1>
        <div className={classes.todoList}>
            <div className={divBtn}><Button>All</Button></div>
            <div className={divBtn}><Button>Done</Button></div>
            <div className={divBtn}><Button>Todo</Button></div>
        </div>
    </div>
};

export default TodoList;