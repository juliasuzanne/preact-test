
import fetch from 'node-fetch';
import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';


export default function Mixtape(){
  let message = useSignal({});

  const apiResult = async() =>{
    try{
      const response = await fetch('https://riyl.fly.dev/infos.json');
      if(response.ok){
        const jsonResponse = await response.json();
        message.value = jsonResponse;
        console.log(jsonResponse);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{apiResult}, [])

  return(
    <div>
      <p>
      {message}
      </p>
    </div>
  )
}
  //   (
  //   `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
  // );

  // https://riyl.fly.dev/infos.json

