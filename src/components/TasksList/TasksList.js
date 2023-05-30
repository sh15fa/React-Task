import React from 'react'
import Task from '../Task/Task'
import classes from './TextList.module.css'
export default function TasksList(props) {
 

  return (
    <ul className={classes.ul}>
      {props.taskes.map((task) => (
        <Task 
        key={task.id}
        id={task.id}
          title={task.title}
         done={task.done}
         handleDoneTask={props.handleDoneTask}
        />
      ))}
    </ul>
  )
}