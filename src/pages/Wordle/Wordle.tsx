import { useSignal } from "@preact/signals";
import {words} from './words';
import {answers} from './answers'
import Guess from "./Guess";

export default function Wordle(){
  const newIndex = Math.floor(Math.random() * answers.length -1)
  const word = useSignal(answers[newIndex])
  const done = useSignal(false);
  const currentGuess = useSignal('');
  const currentGuessCount = useSignal(0);
  const guessesAccuracy = useSignal<string[]>(['xxxxx', 'xxxxx', 'xxxxx', 'xxxxx', 'xxxxx', 'xxxxx']);
  const guesses = useSignal(['     ', '     ', '     ', '     ', '     ' , '     ']);
  const currentError = useSignal('');

  function makeCaseSensitive(word: string){
    let firstLetter = word.substring(0, 1).toUpperCase();
    let restWord = word.substring(1, word.length).toLowerCase();
    return firstLetter + restWord;


  }

  const checkGuess = () => {
    console.log('case sensitive: ' + makeCaseSensitive(currentGuess.value));
  
    if(guesses.value.includes(currentGuess.value)){
      currentError.value = "Already Guessed!";
      console.log('already guessed!');
      currentGuess.value = '';

    }
    else if(currentGuess.value.length === 5){
        if(words.includes(currentGuess.value.toLowerCase())){
          let newAccuracyTracker = '';
          guesses.value[currentGuessCount.value] = currentGuess.value;
          for(let i=0; i<5; i++){
            if(word.value[i] === currentGuess.value[i]){
              console.log('g');
              newAccuracyTracker += 'g';
            }
            else if(word.value.includes(currentGuess.value[i])){
              console.log('y');
              newAccuracyTracker += 'y';

            }
            else if(!word.value.includes(currentGuess.value[i])){
              console.log('r');
              newAccuracyTracker += 'r';


            }
          }
          guessesAccuracy.value[currentGuessCount.value] = newAccuracyTracker;
          if(word.value === currentGuess.value){
            done.value = true;
            currentError.value = "You got it!";
            currentGuess.value = '';

          }
          else{
            currentError.value = 'not quite...';
            currentGuessCount.value++;
            if(currentGuessCount.value > 5){
              currentError.value = 'You lose : ('
              done.value = true;
              setTimeout(()=>resetGame(), 1200);
              

            }
            currentGuess.value = '';

          }
     
        }
        else{
          currentError.value = "Not a valid word!"
          currentGuess.value = '';
        }
    }
    else if(currentGuess.value.length !== 5){
      console.log("GUESS INCORRECT LENGTH - MUST BE A FIVE LETTER WORD")
      currentError.value = "GUESS INCORRECT LENGTH";
      currentGuess.value = '';



    }

  }

  function resetGame(){
    let newIndex = Math.floor(Math.random() * answers.length -1)
    word.value = (answers[newIndex])
    currentGuess.value = '';
    currentGuessCount.value = 0;
    guessesAccuracy.value = ['xxxxx', 'xxxxx', 'xxxxx', 'xxxxx', 'xxxxx', 'xxxxx'];
    guesses.value = ['     ', '     ', '     ', '     ', '     ',  '     '];
    currentError.value = '';
    done.value = false;


  }

  return(
    <div>
      <br>
      </br>
      {guesses.value.map((guess, i)=>{
        return <Guess guess={guess} guessAccuracy={guessesAccuracy.value[i]}/>
      })}
      <br></br>
      {/* <h1>{currentGuess.value}</h1> */}
      <br></br>
  
      <input maxLength={5} className="guessSpace" disabled={done.value} value={currentGuess.value} onChange= { (e)=> currentGuess.value =(e.target as HTMLTextAreaElement).value}></input>
      <br></br>
      <button onClick={(e) => {e.preventDefault(); checkGuess(); console.log(currentGuess.value)}}>GUESS</button>
      <p>{currentError.value}</p>
    </div>

  )

}