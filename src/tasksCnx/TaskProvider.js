import { useEffect, useReducer,useState } from 'react';
import TaskContext from './TaskCnx';
import {db} from '../services/firebase.config';
import { collection, deleteDoc, doc, docs,getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore';

let isGet=true;
let tasksDone=[];
let allTasks=[];
const collectionRef = collection(db ,'tasks' );

const taskReducer=async(state, action)=>{
    //delete a task
    if(action.type ==='DeleteTask'){
      try{
        const documentRef = doc(db , "tasks" , action.id);
        await deleteDoc(documentRef );
    
        }catch(err){
        console.log(err);  
        }  
    }

    //update a task
    if(action.type ==='UpdateTask'){
        const docRef = doc(db,'tasks' ,action.id);
        updateDoc(docRef,{
          title:action.taskUpdatedValue,
        } ).catch(error =>{
          console.log(error.message)
        })
    }
// delete all or done tasks
    if(action.type ==='DeleteAllOrDoneTask'){
        let tasks=[];
    await getDocs (collectionRef).then((task)=>{
      tasks= task.docs.map(doc => ({...doc.data(),id:doc.id}));
      
  });
  if(tasks.length<=0){
    return <p>There are no tasks to delete</p>;
  }else{for(let i =0;i<tasks.length;i++){
      const documentRef = doc(db , "tasks" , tasks[i].id);
      if(action.allOrDone===false){
         await deleteDoc(documentRef );

        
      }
      else if(action.allOrDone=== true && tasks[i].done===true){
        
        await deleteDoc(documentRef );
        
      }
      
    }}
    }  

}


const TaskProvider=(props)=>{
    const [taskes, setTaskes] = useState([]);
    useEffect(()=>{
        onSnapshot(collection(db, 'tasks'),
         (snapshot) => setTaskes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
       
        

    }, []);
    
    const [taskItems,dispatchTaskItem]=useReducer(taskReducer , taskes);
    
    

    const deleteTask=(id)=>{
        dispatchTaskItem({type:'DeleteTask',id:id});
    };

    const updateTask=(id,taskUpdatedValue)=>{
        dispatchTaskItem({type:'UpdateTask',id:id,taskUpdatedValue});
    };
    

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


      const handleDeleteAllOrDoneTask=(allOrDone)=>{
        dispatchTaskItem({type:'DeleteAllOrDoneTask',allOrDone});
      };

    const taskCntx={
        tasks:taskes,
        deleteTask,
        updateTask,
        checkbox:handleDoneTask,
        deleteAllOrDoneTasks:handleDeleteAllOrDoneTask
    };
   
    return <TaskContext.Provider value={taskCntx}>
        {props.children}
    </TaskContext.Provider>
}

export default TaskProvider;