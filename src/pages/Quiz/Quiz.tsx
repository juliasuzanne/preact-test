
import { useSignal } from "@preact/signals"
import { questions, questionType } from "./big5questions";
import Question from "./Question";
import ProgressBar from "./ProgressBar";

export function Quiz(){
  const progress = useSignal();
  const quizQs = useSignal(questions);
  const currentIndex = useSignal(0);

  const traits = useSignal(
    {
      agreeableness: 0,
      contientiousness: 0,
      neuroticism: 0,
      extraversion: 0,
      openness: 0
    }
  )

  
  function addTrait(trait: string, reverse: boolean, num: number){
    if(reverse){
      num = -num;
    }

    let traitToAdd = trait;
    traits.value = {
      ...traits.value,
      [traitToAdd]: traits.value[traitToAdd] + num
    }

    currentIndex.value +=1;
    }


  return(
    <div>
      <h1>
        What is your Big 5 personality type?
      </h1>
      <p>There are many types of personalities out there, and psychologists have worked on a model that I particularly like: the Big 5</p>

      <p>{traits.value.extraversion}{traits.value.neuroticism}{traits.value.contientiousness}{traits.value.openness}{traits.value.agreeableness}</p>

      <h3>I am someone who...</h3>
      <Question question={quizQs.value[currentIndex.value]} addToTrait={addTrait} />
      <ProgressBar totalProgress={quizQs.value.length} currentProgress={currentIndex}/>

    </div>
  )
}