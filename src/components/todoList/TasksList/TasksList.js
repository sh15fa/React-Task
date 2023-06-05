import React, { Fragment } from 'react';
import Task from '../Task/Task';
import classes from './TextList.module.css';
import classe from '../TodoList.module.css';
import Button from '../../UI/Button';
export default function TasksList(props) {
  
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
    
            <div className={classes.divBtn}><Button className={classes.btn} onClick={()=>props.handleDeleteAllOrDoneTask(true)}>Delete done tasks</Button></div>
            <div className={classes.divBtn}><Button  className={classes.btn} onClick={()=>props.handleDeleteAllOrDoneTask(false)}>Delete all tasks</Button></div>
           
        </div>
    </Fragment>
  )
}