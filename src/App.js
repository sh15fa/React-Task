import logo from './logo.svg';

import TodoInput from './components/todoInput/TodoInput';
import TodoList from './components/todoList/TodoList';

function App() {
  async function onAddTask(task){
    const response=await fetch('https://react-task-master-default-rtdb.firebaseio.com/tasks.json',
    {
      method:'POST',
      body:JSON.stringify(task),
     
    });
    const data=await response.json();
    console.log(data);
  }
  return (
    <div >
    <TodoInput onAddTask={onAddTask}/>
    <TodoList/>
      
    </div>
  );
}

export default App;