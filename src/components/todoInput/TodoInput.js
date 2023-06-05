import React, { Fragment, useState } from "react";
import classes from './TodoInput.module.css';
import InputTask from "./InputTsak";
import {db} from '../../services/firebase.config';
import {  addDoc ,collection} from "firebase/firestore";

const TodoInput = ()=>{
    const collectionRef = collection(db ,'tasks' );

    const  onAddTaskHandler=async(task)=>{

        try{
            
            await addDoc(collectionRef,task);

        }catch(err){
            console.log(err);

        }
      }
      
    return <Fragment>
        <h1>TodoInput</h1>
        <section className={classes.addTask}>
           <InputTask onAddTask={onAddTaskHandler}/>
        </section>
    </Fragment>
};

export default TodoInput;