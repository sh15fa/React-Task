import React, { Fragment, useRef } from "react";
import classes from './InputTsak.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Button from "../UI/Button";

const InputTask = (props)=>{
    const titleRef = useRef('');

    function submitHandler(event) {
        event.preventDefault();
    
        const task = {
          title: titleRef.current.value,
          done:false
        };
    
        props.onAddTask(task);
      }



    return <Fragment>
       <form onSubmit={submitHandler}>
       <div className={classes.inputField}>
       <div className={classes.icons}>
        <FontAwesomeIcon 
        icon={faBook} 
        className={classes.icon}
         size="lg"/>
        </div>
        <input type="text" placeholder="New Todo" ref={titleRef} />
        </div>
        <Button >Add new task</Button>
        
       </form> 
    </Fragment>
};

export default InputTask;