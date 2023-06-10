import React, { useContext, useState } from 'react'
import clasess from './Task.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditTask from './EditTask';
import TaskContext from '../../../tasksCnx/TaskCnx';
export default function Task(props) {
   const [isChecked,setIsChecked]=useState(false);
   const taskCntx=useContext(TaskContext);

   const classCheck= isChecked ? clasess.checked : '';
   const toggleCheck = ()=>{
    setIsChecked(prevState =>!prevState);
   };
   const deleteTaskHandler=(id)=>{
    taskCntx.deleteTask(id);
  };

  const handleDoneTask=(id)=>{
    taskCntx.checkbox(id);
  };
//
  return (
    <li className={clasess.border}>
       <h2 className={props.done ?clasess['title-done']:clasess['title-notDone']}>{props.title}</h2>
       <div className={clasess.icons}>
                   
       <span >
       <input type='checkbox' 
       checked={props.done} 
       onChange={toggleCheck} 
       onClick={handleDoneTask.bind(null,props.id)}
       value={props.done} />
       </span>
       
        <span>
        <EditTask taskTitle={props.title} id={props.id}/>
        </span>
        
        <span > 
        <FontAwesomeIcon icon={faTrash} className={clasess.trash}  onClick={deleteTaskHandler.bind(null,props.id)} />
        </span>
        </div>
        
      
   
  </li>
  )
}