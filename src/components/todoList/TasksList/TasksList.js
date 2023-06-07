import React, { Fragment } from 'react';
import Task from '../Task/Task';
import classes from './TextList.module.css';
import classe from '../TodoList.module.css';
import Button from '../../UI/Button';
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
        handleDoneTask={props.handleDoneTask}
        handleDeleteTask={props.handleDeleteTask}
        updateTask={props.updateTask}
        />
      ))}
    </ul>
    <div className={classe.todoList}>
            <ConfirmModal tasks={tasks} bool={done} handleDeleteAllOrDoneTask={props.handleDeleteAllOrDoneTask}> Delete done tasks</ConfirmModal>
            <ConfirmModal tasks = {props.taskes} bool={all} handleDeleteAllOrDoneTask={props.handleDeleteAllOrDoneTask} >Delete all tasks</ConfirmModal>
           
        </div>
    </Fragment>
  )
}