import React, { Fragment, useContext, useEffect, useState } from 'react';
import Task from '../Task/Task';
import classes from './TextList.module.css';
import classe from '../TodoList.module.css';
import ConfirmModal from '../../UI/ConfirmModal';
export default function TasksList(props) {

  const done =true;
  const all = false;
  let tasks=[];
  for(let i=0;i<props.taskes.length;i++){
    if(props.taskes[i].done===true){
      tasks.push(props.taskes[i]);
    }
  }

 
  
  
  return (<Fragment>
    <ul className={classes.ul}>
      {props.taskes.map((task) => (
        <Task 
        key={task.id}
        id={task.id}
        title={task.title}
        done={task.done}
        />
      ))}
    </ul>
    <div className={classe.todoList}>
            <ConfirmModal tasks={tasks} bool={done} > Delete done tasks</ConfirmModal>
            <ConfirmModal tasks = {props.taskes} bool={all} >Delete all tasks</ConfirmModal>
           
        </div>
    </Fragment>
  )
}