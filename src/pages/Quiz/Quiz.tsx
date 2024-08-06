
import { useSignal } from "@preact/signals"
import { questions } from "./big5questions";

export function Quiz(){
  const progress = useSignal();
  const quizQs = useSignal(questions);
  const traits = useSignal(
    {
      agreeableness: 0,
      orderliness: 0,
      neuroticism: 0,
      extraversion: 0,
      openness: 0
    }
  )

  
  function addTrait(trait: string, num: number){
    let traitToAdd = trait;
    traits.value = {
      ...traits.value,
      [traitToAdd]: traits.value[traitToAdd] + num
    }
    }


  return(
    <div>
      <h1>
        What is your Big 5 personality type?
      </h1>
      <p>There are many types of personalities out there, and psychologists have worked on a model that I particularly like: the Big 5</p>
      <p>The Big 5 Traits are:</p>
      <ul>
        <li>Agreeableness</li>      
        <li>Openness</li>      
        <li>Orderliness</li>       
        <li>Neuroticism</li>  
        <li>Extraversion</li>  
      </ul>
      <button onClick={()=>addTrait('agreeableness', 10)}>Add 10 agreeable</button>
      <button onClick={()=>addTrait('openness', 10)}>Add 10 openness</button>


      <p>{traits.value.extraversion}</p>
      <p>{traits.value.neuroticism}</p>
      <p>{traits.value.orderliness}</p>
      <p>{traits.value.openness}</p>
      <p>{traits.value.agreeableness}</p>

      <h3>Take the test below to find out how you score!</h3>
      {quizQs.value.map((q)=>
      <div>
        <p>{q.question}</p>
        <p>{q.trait}</p>
        </div>
      )}



    </div>
  )
}