import React, { Fragment } from "react";
import classes from './InputTsak.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Button from "../UI/Button";

const InputTask = ()=>{
    return <Fragment>
       <form >
       <div className={classes.inputField}>
       <div className={classes.icons}>
        <FontAwesomeIcon 
        icon={faBook} 
        className={classes.icon}
         size="lg"/>
        </div>
        <input type="text" placeholder="New Todo"  />
        </div>
        <Button>Add new task</Button>
        
       </form> 
    </Fragment>
};

export default InputTask;