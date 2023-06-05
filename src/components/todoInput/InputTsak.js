import React, { Fragment, useRef ,useState} from "react";
import classes from './InputTsak.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Button from "../UI/Button";
import {db} from '../../services/firebase.config';
import { serverTimestamp } from "firebase/firestore";

const InputTask = (props)=>{
    const [input,setInput]=useState('');
    const [inputTouched,setInputTouched]=useState(false);
    const titleRef = useRef('');

    const inputIsValid = input.trim() !== '';
    const inputIsInvalid = !inputIsValid && inputTouched;
    
    const inputChangeHandler = event=>{
    setInput(event.target.value);
   
  };

   const inputBlurHandler = event=>{
    setInputTouched(false);
  };

 

    const submitHandler=(event) =>{
        event.preventDefault();
        
        setInputTouched(true);
        if(input.trim()===''){
          setInput('');
            return;
        }
        const task = {
          title: input,
          done:false,
          timestamp:serverTimestamp()

        };
        
        props.onAddTask(task);
        setInput('');
        setInputTouched(false);
      }



    return <Fragment>
       <form onSubmit={submitHandler}>
       <div className={classes.inputField}>
       <label className={classes.icons}
       htmlFor="input">
        <FontAwesomeIcon 
        icon={faBook} 
        className={classes.icon}
         size="lg"
         />
        </label>
        <input type="text" id="input" placeholder="New Todo" ref={titleRef} onChange={inputChangeHandler} value={input} onBlur={inputBlurHandler} />
        
        </div>
        {inputIsInvalid && <p className={classes['error-text']}>The Task Must Not Be Empty</p>}
        <Button onBlur={inputBlurHandler}>Add new task</Button>
        
       </form> 
    </Fragment>
};

export default InputTask;