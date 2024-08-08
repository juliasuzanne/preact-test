import {useContext} from 'preact/hooks';
import { AppState } from '../../index';
import { useSignal } from '@preact/signals';

const ToDo = ({task, removeTask}) => {
  return(
    <li>{task}
    <button onClick={() => removeTask(task)}>X</button>
    </li>
  )
}

export function Profile(){
  const {todos, addToDo, newTodo, removeToDo} = useContext(AppState);
  const tasks = useSignal(['take out trash', 'watch TV', 'forget']);
  const newTask = useSignal('');

  const handleRemoveTask = (task : string) =>{
    tasks.value = tasks.value.filter((t)=> t!== task);
  }

  const handleAddTask = (e: Event) =>{
    e.preventDefault();
    tasks.value = [...tasks.value, newTask.value];
    newTask.value = ('');

  }

return(
  <div>
  <ul>
      {todos.value.map((todo, i) =>
      <li>{todo}<button onClick={()=> removeToDo(i)}>X</button></li>)}
  </ul>
  <form onSubmit={addToDo}>
        <input value={newTodo.value} onChange={(event) => {newTodo.value = (event.target as HTMLTextAreaElement).value}} />
        <button type="submit">Add todo</button>
      </form>
  <a href="/">Back</a>
  <form onSubmit={handleAddTask}>
    <input value={newTask.value} onChange={(e)=> newTask.value = (e.target as HTMLTextAreaElement).value} placeholder = "Add new"></input>
    <button type='submit'>Add Task</button>
  </form>
  <ul>
      {tasks.value.map((task)=>
      <ToDo task={task} removeTask={handleRemoveTask}/>
      )}
  </ul>



  </div>
)
}

