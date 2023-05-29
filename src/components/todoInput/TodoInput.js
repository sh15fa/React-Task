//<i class="fa-regular fa-book"></i>
//rgb(22, 163, 183)
import React, { Fragment } from "react";
import classes from './TodoInput.module.css';
import InputTask from "./InputTsak";

const TodoInput = ()=>{
    return <Fragment>
        <h1>TodoInput</h1>
        <section className={classes.addTask}>
           <InputTask/>
        </section>
    </Fragment>
};

export default TodoInput;