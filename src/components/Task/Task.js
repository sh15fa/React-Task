import React, { useState } from 'react'
import clasess from './Task.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck,faSquare } from '@fortawesome/free-solid-svg-icons';
export default function Task(props) {
   
  return (
    <li className={clasess.border}>
       <h2 className={props.done ===true?clasess['title-done']:clasess['title-notDone']}>{props.title}</h2>
       <div className={clasess.icons}>
                   
       <span><FontAwesomeIcon  onClick={()=>props.handleDoneTask(props.id)}  icon={props.done ===true?faSquareCheck:faSquare} style={props.done ===true?{color: "#389825",}:{color: "#313231",}} />
     </span>
       
        <span>
        <FontAwesomeIcon icon={faPen} style={{color: "#e4bd2f",}} />
        </span>
                    <span > 
<FontAwesomeIcon icon={faTrash} style={{color: "#eb0000",}} />
                    </span>
                </div>
        
      
   
  </li>
  )
}