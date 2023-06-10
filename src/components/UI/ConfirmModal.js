import { useContext, useState } from 'react';
//import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import classes from './Button.module.css';
//import Button from 'react-bootstrap/Button';
import Button from './Button';
import TaskContext from '../../tasksCnx/TaskCnx';

function ConfirmModal(props) {
  const [show, setShow] = useState(false);
  const [len,setLen]=useState(false);

  const cnx=useContext(TaskContext);

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true);
if(props.tasks.length ===0){
    setLen(true);
}else{
    setLen(false);
} };

  

  return (
    <>
      <div className={classes.divBtn}>
      <Button className={classes.btn} onClick={handleShow}>
      {props.children}
      </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{!len && <p className={classes.modalBody}>Are you sure you want {props.children}</p>}
        {len && <p className={classes.modalBody} >There are no done tasks to delete</p>}
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose} className={classes.btnClose}>
            Close
          </button>
          <button variant="primary" className={classes.btnConf} onClick={()=>{   
            cnx.deleteAllOrDoneTasks(props.bool);
            handleClose();
          }
            }>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;