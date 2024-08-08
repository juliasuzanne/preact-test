import { useSignal } from "@preact/signals"
export default function Question({question, addToTrait}){
  const visible = useSignal(false);

  return(
    <div>
      <p hidden={visible}>{question.question}</p>
      <div hidden={visible} class="buttons">
      <button onClick={()=> {addToTrait(question.trait, -10), visible.value=true}}>
        Very much unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, -5), visible.value=true}}>
        Somewhat unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, 0), visible.value=true}}>
        Neither like me or unlike me
      </button>
      <button onClick={()=> {addToTrait(question.trait, 5), visible.value=true}}>
        Somewhat like me
      </button>
      <button onClick={()=> {addToTrait(question.trait, 10), visible.value=true}}>
        Very much like me
      </button>
      </div>
    </div>
  )
}