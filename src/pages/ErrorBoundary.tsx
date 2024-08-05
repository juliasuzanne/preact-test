import { useErrorBoundary } from "preact/hooks";
import {h} from 'preact';


const ErrorBoundary = (props) => {
  const [error, resetError] = useErrorBoundary();

  if(error){
    return(
      <div>
      <p>Error! {error.value.message} </p>
      <button onClick={resetError}>Reset</button>
      </div>
    )
  }

  return props.children;

}

export default ErrorBoundary;