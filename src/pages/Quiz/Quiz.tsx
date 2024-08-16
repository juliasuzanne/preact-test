
import { useSignal } from "@preact/signals"
import { questions, questionType } from "./big5questions";
import Question from "./Question";
import Results from "./Results";
import ProgressBar from "./ProgressBar";
import { Chart } from "chart.js";
import { NewCharts } from "./Chart";

export function Quiz(){
  const visible = useSignal(false);
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

    if(currentIndex.value < quizQs.value.length -1){
      currentIndex.value +=1;
    }
    else{
      console.log('test');
      visible.value = true;
    }
    }


  return(
    <div>
      <h1>
        What is your Big 5 personality type?
      </h1>
      <p>There are many types of personalities out there, and psychologists have worked on a model that I particularly like: the Big 5</p>

      <p>EX {traits.value.extraversion} NE {traits.value.neuroticism} CO {traits.value.contientiousness} OP {traits.value.openness} AG {traits.value.agreeableness}</p>

      <h3 hidden={visible.value}>I am someone who...</h3>
      <Question  show={visible.value} question={quizQs.value[currentIndex.value]} addToTrait={addTrait} />
      <ProgressBar show={visible.value} totalProgress={quizQs.value.length} currentProgress={currentIndex}/>
      <Results show={!visible.value} traits={traits} />

    </div>
  )
}