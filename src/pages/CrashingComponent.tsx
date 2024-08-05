// import ErrorBoundary from "./ErrorBoundary";
// import {h} from 'preact';

// export default function CrashingComponent(){
//   const crash = () => {
//     throw new Error('error! this is an error! except it is on purpose!');
//   }

//   return(
//     <div>
//       <p>This is outside the error boundary</p>
//       <ErrorBoundary>
//         <button onClick={crash}>
//           Crash me!
//         </button>
//         <p>This is inside the error boundary</p>
//       </ErrorBoundary>
//     </div>
//   )
// }

import { h } from "preact";
import { useState, useContext } from "preact/hooks";
 
const CrashingComponent = () => {
  const [error, setError] = useState(null);
  const [test, setTest] = useState(1);
 
  
  if (error) {
    console.log(error);
    return (
      <>
        <p>An error happened, sorry! Message:{error.message}</p>
        <button onClick={() => setError(null)}>Try again</button>
      </>
    );
  }

  if(test >= 0){
    console.log(test);
  }
 
  return (
    <>
      <p>This is a component that will crash the app.</p>
 
      <button
        onClick={() => {
          try {
            throw new Error("Crash!");
          } catch (e) {
            setError(e);
          }
        }}
      >
        Crash!
      </button>
      <button onClick={()=>{
        setTest((prev)=> prev + 1);
      }}>
        {test}
      </button>
    </>
  );
};
 
export default CrashingComponent;