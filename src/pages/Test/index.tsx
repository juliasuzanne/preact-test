import { signal } from '@preact/signals';
import { useContext } from 'preact/hooks';
import { AppState } from '../../index';

export function Test(){

  const {todos, newTodo, addToDo, removeToDo} = useContext(AppState);

  return(
    <div>
      <p>
        Test {testFunction(3)}
      </p>
      <button>This is a button</button>
      <ul>
      {todos.value.map((todo, i) =>
      <li>{todo}<button onClick={()=>removeToDo(i)} >X</button></li>)}
      </ul>
      <form onSubmit={addToDo}>
        <input value={newTodo.value} onChange={(event) => {newTodo.value = (event.target as HTMLTextAreaElement).value}} />
        <button type="submit">Add todo</button>
        <a href="/profile">Go to profile</a>
      </form>
    </div>
  )
}

const testFunction = (num: number):string => {
  let number = num + 2;
  console.log({number});
  return `This is a test ${num + 2}`;
}