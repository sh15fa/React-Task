import React, { useEffect, useState } from "react";
import classes from './TodoList.module.css';
import Button from "../UI/Button";
import TasksList from "./TasksList/TasksList";
import {db} from '../../services/firebase.config';
import {  collection , deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

const TodoList = (props)=>{
const [taskes, setTaskes] = useState([]);
const [isGet,setIsGet]=useState(true);
const [isDone,setIsDone]=useState(false);
const [isTodo,setIsTodo]=useState(false);
//fetching data from firestore
const collectionRef = collection(db ,'tasks' );
const getTasks= async ()=>{
  const q=query(collectionRef,orderBy('timestamp'));
    let tasksData=[];
    await getDocs (q).then((task)=>{
        tasksData= task.docs.map(doc => ({...doc.data(),id:doc.id}));  
    });
    setTaskes(tasksData);
}; 
//fetchind done tasks or todo tasks
const getDoneOrTodoTasks=async(bool)=>{
  setIsGet(false);
  const queryTask=query(collectionRef , where('done','==',bool));
   await getDocs(queryTask).then((task)=>{
      const tasksdone= task.docs.map(doc => ({...doc.data(),id:doc.id}));
      setTaskes(tasksdone);
      
   });
   
    
};

useEffect( ()=>{
  if( isGet===true){
    getTasks();
  }else{
    if(isDone===true){
      getDoneOrTodoTasks(true);
    }else{
      getDoneOrTodoTasks(false);
    }
  }
  
},[isGet,getTasks,isDone,getDoneOrTodoTasks]);


const  fetchAllTasks=  ()=>{
   setIsGet(true);
  
   
 };
 //change checkbox value;
const handleDoneTask=(id)=>{
    const filteredItems = taskes.map(item => {
			item.id === id && (item.done = !item.done)
			return item
		})

		setTaskes(filteredItems);
        console.log('tasks',taskes);
        hadleCheckbox(id);
  }
  //change checkbox value in firestore
  const hadleCheckbox = (id)=>{
    console.log(id);
    let done;
    let title;
    let timestamp;
    const docRef=doc(db , 'tasks' , id);
     taskes.map(item =>{
        if(item.id===id){
            done=item.done;
            title = item.title;
            timestamp=item.timestamp
        }  
    });
    const checked ={"title":title,"done":done ,"timestamp":timestamp};
    setDoc(docRef,checked);
  }

//deletting a task
  const handleDeleteTask=async(id)=>{
    try{
            const documentRef = doc(db , "tasks" , id);
        await deleteDoc(documentRef );
        
        
    }catch(err){
      console.log(err);  
    }
  };
  //Update a task
  const updateTask=(id , taskUpdatedValue)=>{
    console.log('updated Task in list');
    const docRef = doc(db,'tasks' ,id);
    updateDoc(docRef,{
      title:taskUpdatedValue,
    } ).catch(error =>{
      console.log(error.message)
    })
  };
  //delete all Or done tasks
  const handleDeleteAllOrDoneTask=async(allOrDone)=>{
    let tasks=[];
    await getDocs (collectionRef).then((task)=>{
      tasks= task.docs.map(doc => ({...doc.data(),id:doc.id}));
      
  });
  if(tasks.length<=0){
    return <p>There are no tasks to delete</p>;
  }else{for(let i =0;i<tasks.length;i++){
      const documentRef = doc(db , "tasks" , tasks[i].id);
      if(allOrDone===false){
         await deleteDoc(documentRef );

        
      }
      else if(allOrDone=== true && tasks[i].done===true){
        
        await deleteDoc(documentRef );
        
      }
      
    }}
    

    

  };
    const divBtn= classes.divBtn;
    return <div>
        <h1>TodoList</h1>
        <div className={classes.todoList}>
            <div className={divBtn}><Button  onClick={fetchAllTasks}>All</Button></div>
            <div className={divBtn}><Button onClick={()=>{setIsDone(true);
            setIsGet(false);}} >Done</Button></div>
            <div className={divBtn}><Button onClick={()=>{setIsDone(false);
            setIsGet(false);}}>Todo</Button></div>
        </div>
        
        {taskes.length===0 && <p className={classes.notaskYet}>There is no tasks here yet</p>}
        {taskes.length>0 && <TasksList taskes={taskes} 
        handleDoneTask={handleDoneTask} 
        handleDeleteTask={handleDeleteTask}
        handleDeleteAllOrDoneTask={handleDeleteAllOrDoneTask}
        updateTask={updateTask}
        />}
    </div>
};

export default TodoList;