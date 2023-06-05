import { useReducer, useState } from "react";
import {db} from '../../services/firebase.config';
import { collection, getDoc } from "firebase/firestore";
const initialInputState = {
    value:'',
    isTouched:false
};

const inputStateReducer = async(prevState ,action)=>{
    if(action.type ==='INPUT'){
       
        return {
           value :action.value,
           isTouched:prevState.isTouched

    }}
    if(action.type ==='BLUR'){
        return {isTouched:true,
        value:prevState.value};


    }
    if(action.type ==='RESET'){
        return {isTouched:false,
        value:''};
    }
    return prevState;
};

const useInput = async()=>{
    const [inputState,dispach]= useReducer(inputStateReducer,initialInputState);
    const [inputIsExist,setInputIsExist]=useState(false);
 
    //  const [enteredValue,setEnteredValue] = useState('');
    //  const [isTouched,setIsTouched] = useState(false);
 
     const inputIsValid = inputState.value.trim() !== '';
     let tasksData=[];
     const collectionRef = collection(db ,'tasks' );
        await getDoc (collectionRef).then((task)=>{
            tasksData= task.docs.map(doc => ({...doc.data(),id:doc.id}));  
        });
        
        for (let i=0;i<tasksData.length;i++){
            if(inputState.value.trim()===tasksData[i].title){
                setInputIsExist(true);
                break;
            }else{
                setInputIsExist(false);
            }
        }

      

   
     const hasError = !inputIsValid && inputState.isTouched ;
     
     
     const valueChangeHandler = event=>{
         dispach({type: 'INPUT' ,value : event.target.value});
         //setEnteredValue(event.target.value);
        
       };
 
       const inputBlurHandler = event=>{
         //setIsTouched(true);
         dispach({type: 'BLUR' });
       };
       
       const reset=()=>{
         dispach({type:'RESET'});
        //  setEnteredValue('');
        //  setIsTouched(false);
       };
 
     return {value:inputState.value,
        // isValid:valueIsValid,
         inputIsExist,
         hasError,
         valueChangeHandler,
         inputBlurHandler,
         reset
 
 
     };
 };
 export default useInput;