import { useSignal } from "@preact/signals"
import './questions.css';
export default function Question({question, addToTrait}){
  const visible = useSignal(false);

  return(
    <div className="button_quiz">
      <p class="buttonHeader" hidden={visible}>{question.question}</p>
      <div hidden={visible} class="buttons">
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 1), visible.value=true}}>
        Very much unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 2), visible.value=true}}>
        Somewhat unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 3), visible.value=true}}>
        Neither like me or unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 4), visible.value=true}}>
        Somewhat like me
      </button>
      <button onClick={()=> {addToTrait(question.trait, question.reverse, 5), visible.value=true}}>
        Very much like me
      </button>
      </div>
    </div>
  )
}