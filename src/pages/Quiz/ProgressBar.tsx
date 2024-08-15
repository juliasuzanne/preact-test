import { useSignal } from '@preact/signals';
import './questions.css'

export default function ProgressBar({currentProgress, totalProgress}){
  let progress = Math.floor(currentProgress/totalProgress * 100);
 
  return(
    <div>
    <div className="progressBar">
    <div className="progressBar2" style={progress > 9 ? {'width': `${Math.floor(currentProgress/totalProgress * 100)}%`}: {'width': `9%`} }>
    </div>
    <p>{currentProgress} / {totalProgress}</p>


    </div>

    </div>
  )
}