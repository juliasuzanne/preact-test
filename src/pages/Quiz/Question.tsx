import { useSignal } from "@preact/signals"
import './questions.css';
export default function Question({question, addToTrait}){

  return(
    <div className="button_quiz">
      <p class="buttonHeader">{question.question}</p>
      <div class="buttons">
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 1)}}>
        Very much unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 2)}}>
        Somewhat unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 3)}}>
        Neither like me or unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 4)}}>
        Somewhat like me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 5)}}>
        Very much like me
      </button>
      </div>
    </div>
  )
}