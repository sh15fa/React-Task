import React, { useContext, useEffect, useState } from "react";
import classes from './TodoList.module.css';
import Button from "../UI/Button";
import TasksList from "./TasksList/TasksList";
import {db} from '../../services/firebase.config';
import TaskContext from "../../tasksCnx/TaskCnx";
import {  collection , deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

const TodoList = (props)=>{
 
const [taskes, setTaskes] = useState([]);
const [isGet,setIsGet]=useState(true);
const [isDone,setIsDone]=useState(false);
const cnx = useContext(TaskContext);
const collectionRef = collection(db ,'tasks' );
//fetchind done tasks or todo tasks
const getDoneOrTodoTasks=async(bool)=>{
  setIsGet(false);
  const queryTask=query(collectionRef , where('done','==',bool));
   await getDocs(queryTask).then((task)=>{
      const tasksdone= task.docs.map(doc => ({...doc.data(),id:doc.id}));
      setTaskes(tasksdone);
      
   });
   
    
 };


useEffect(()=>{
  
  if(isGet){
    setTaskes(cnx.tasks);

  }
  else{
    if(isDone){
            getDoneOrTodoTasks(true);
          }else{
            getDoneOrTodoTasks(false);
          }
  }
    
  },[cnx,isDone,isGet]);



const  fetchAllTasksHandler=  ()=>{
   setIsGet(true);
   
 };

  
    const divBtn= classes.divBtn;
    return <div>
        <h1>TodoList</h1>
        <div className={classes.todoList}>
            <div className={divBtn}><Button  onClick={fetchAllTasksHandler}>All</Button></div>
            <div className={divBtn}><Button onClick={()=>{setIsGet(false); setIsDone(true)}} >Done</Button></div>
            <div className={divBtn}><Button onClick={()=>{setIsGet(false); setIsDone(false)}}>Todo</Button></div>
        </div>
        
        {taskes.length===0 && <p className={classes.notaskYet}>There is no tasks here yet</p>}
        {taskes.length>0 && <TasksList taskes={taskes}/>}
    </div>
};

export default TodoList;