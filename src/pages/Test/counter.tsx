import {h} from 'preact';
import { useSignal } from '@preact/signals';
import { useState } from 'preact/hooks';

export default function MyCounter(){
const count = useSignal(0);
const [count2, setCount2] = useState(0);


const increment = (value: number) => {
  count.value = value + 1;
}

const increment2 = () =>{
  setCount2((prev)=> prev + 1);
}

return(
  <div>
    <h1>{count.value}</h1>
    <button onClick={()=>increment(count.value)}>
      Add!
    </button>
    <h1>{count2}</h1>
    <button onClick={increment2}>
      Add!
    </button>
    
  </div>
)
}