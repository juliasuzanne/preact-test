import { useSignal } from "@preact/signals";

export default function Riddler(){
  const answer = 'echo'
  const answered = useSignal('');
  const correct = useSignal(false);

  function handleSubmit(e : Event){
    e.preventDefault();
    if(answered.value.toLowerCase() === answer){
      correct.value = true;
    }
    else{
      correct.value = false;
    }
  }

  return(
    <div>
      <form autocomplete="off" onSubmit={handleSubmit}>
        <h2>I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?</h2>
        <input autocomplete="off" placeholder="your answer here" value={answered} onChange={(e) => answered.value = (e.target as HTMLTextAreaElement).value }>{answered}</input>
        <button type="submit">Submit Answer</button>
      </form>
      {correct.value === true ? <p>You got it!</p> : <p>You can get it ...</p>}
    </div>
  )

}