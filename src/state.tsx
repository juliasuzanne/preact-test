import { signal } from "@preact/signals";

function createAppState(){

let todos = signal(['Take out trash', 'Clean room']);
const newTodo = signal("");
const addToDo = (event : Event) =>{
  event.preventDefault();
  todos.value = [...todos.value, newTodo.value];
  newTodo.value = ("");
}

const removeToDo = (index : number) => {
  todos.value = todos.value.filter((todo, i)=> i !== index);
}
  return {todos, newTodo, removeToDo, addToDo};

}

export default createAppState();