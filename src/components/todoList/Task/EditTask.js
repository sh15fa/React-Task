import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import clasess from './Task.module.css';
import classes from '../../todoInput/InputTsak.module.css';
//We can take some form example from ...(form in tailwind in css)...
function EditTask(props) {
  const [show, setShow] = useState(false);
  const [inputTouched,setInputTouched]=useState(false);
  const [taskkTitle, setTaskkTitle] = useState(props.taskTitle);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputIsValid = taskkTitle.trim() !== '';
 // const isValidInput= inputIsValid && (props.taskTitle.trim()!=='');

  return (
    <>
      <FontAwesomeIcon icon={faPen} className={clasess.edit} onClick={handleShow}/>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id='editTask' className="w-full max-w-sm" onSubmit={(e)=>{
            e.preventDefault();
            setInputTouched(true);
            if(taskkTitle.trim()===''){
              return;
            }
            console.log('hello from editing');
            console.log(props.id,taskkTitle);
            props.updateTask(props.id,taskkTitle);
            setInputTouched(false);
          }}>
            <div className="md:flex md:items-center mb-6">
              
              <div className="md:w-2/3">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="inline-full-name"
                 type="text" 
                 defaultValue={props.taskTitle}
                  onChange={(e)=>setTaskkTitle(e.target.value)}
                  
                 />

              </div>
            </div>

            {!inputIsValid && <p className={classes['error-text']}>The Task Must Not Be Empty</p>}
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button className={clasess.btnClose} onClick={handleClose}>
            Close
          </button>
          <button form='editTask' className={clasess.btn} >Update</button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;