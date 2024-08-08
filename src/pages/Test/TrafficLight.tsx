import './trafficlight.css'
import { useEffect } from 'preact/hooks'
import { useSignal } from '@preact/signals'
import { l } from '../../../dist/assets/index-BtOS6nLE';


export default function TrafficLight(){
  const currentColor = useSignal('red');
  const currentTime = useSignal(4000);


  function handleChangeColor(){
      switch (currentColor.value){
        case('red'):
        currentColor.value = 'green';
        currentTime.value = 3000;
        break;
        case('yellow'):
        currentColor.value = 'red';
        currentTime.value = 4000;

        break;
        case('green'):
        currentColor.value = 'yellow';
        currentTime.value = 500;

        break;
        default: 
        return currentColor.value = 'red';
      }

  }


  useEffect(() => {
    const changeColorTimeout = setTimeout(() => {handleChangeColor()}, currentTime.value)
    return () =>{
      clearTimeout(changeColorTimeout);
    }
  }, [currentColor.value]
  )

  return(
    <div className="traffic-container">
      <div className={currentColor.value === 'red'? 'red': 'circle'}></div>
      <div className={currentColor.value === 'yellow'? 'yellow': 'circle'}></div>
      <div className={currentColor.value === 'green'? 'green': 'circle'}></div>
    </div>
  )
}