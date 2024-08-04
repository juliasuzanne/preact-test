import {useContext} from 'preact/hooks';
import { AppState } from '../../index';

export function Profile(){
  const {todos, addToDo, newTodo, removeToDo} = useContext(AppState);
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
  </div>
)
}

