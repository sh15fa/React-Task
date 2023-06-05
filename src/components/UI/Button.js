import React from "react";


import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      onBlur={props.onBlur}>
      {props.children}
    </button>
  );
};

export default Button;