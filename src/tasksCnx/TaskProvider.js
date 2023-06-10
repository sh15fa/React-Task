import { useReducer,useState } from 'react';
import TaskContext from './TaskCnx';
import {db} from '../services/firebase.config';
import { deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
 let tasksData=[];
const getTasks= async ()=>{
    const q=query(collectionRef,orderBy('timestamp'));
      await getDocs (q).then((task)=>{
          tasksData= task.docs.map(doc => ({...doc.data(),id:doc.id}));  
      });
      
  };
  getTasks(); 



  const defaultTaskItem = {
    tasks:tasksData,
}

const taskReducer=async(state, action)=>{
   
    if(action.type ==='DeleteTask'){
        console.log(tasksData);
    //    const indexLoc=state.tasks.findIndex(
    //     item => item.id===action.item.id
    //    );
    //    const existTask=state.tasks[indexLoc];
      let updatedItems= state.items.filter(item => item.id !== action.id);
        try{
            if(window.confirm('Are you sure you want delete this task')){
                const documentRef = doc(db , "tasks" , action.id);
            await deleteDoc(documentRef );
            
            }
        }catch(err){
          console.log(err);  
        }
        return {
            tasks:updatedItems
        }
        
    }
   // return defaultTaskItem;

}
const TaskProvider=(props)=>{
    const [taskes, setTaskes] = useState([]);
    const [taskItems,dispatchTaskItem]=useReducer(taskReducer , defaultTaskItem);
      
      
    
    // const fetchAllTasks=()=>{
    //     dispatchTaskItem({type:'FetchAll'});
    // }
    const deleteTask=(id)=>{
        dispatchTaskItem({type:'DeleteTask',id:id});
    }



    const taskCntx ={
        tasks:taskItems.tasks,
        deleteTask:deleteTask
    };
    return <TaskContext.Provider value={taskCntx}>
        {props.children}
    </TaskContext.Provider>
}

export default TaskProvider;