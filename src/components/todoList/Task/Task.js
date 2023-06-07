import React, { useState } from 'react'
import clasess from './Task.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import EditTask from './EditTask';
export default function Task(props) {
   const [isChecked,setIsChecked]=useState(false);

   const classCheck= isChecked ? clasess.checked : '';
   const toggleCheck = ()=>{
    setIsChecked(prevState =>!prevState);
   };
//
  return (
    <li className={clasess.border}>
       <h2 className={props.done ===true?clasess['title-done']:clasess['title-notDone']}>{props.title}</h2>
       <div className={clasess.icons}>
                   
       <span >
       <input type='checkbox' 
       checked={props.done} 
       onChange={toggleCheck} 
       onClick={()=>props.handleDoneTask(props.id)}
       value={props.done} />
       </span>
       
        <span>
        <EditTask taskTitle={props.title} updateTask={props.updateTask} id={props.id}/>
        </span>
        
        <span > 
        <FontAwesomeIcon icon={faTrash} className={clasess.trash}  onClick={()=>props.handleDeleteTask(props.id)} />
        </span>
        </div>
        
      
   
  </li>
  )
}