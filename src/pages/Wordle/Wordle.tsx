import { useSignal } from "@preact/signals";
import {words} from './words';
import Guess from "./Guess";

export default function Wordle(){
  const newIndex = Math.floor(Math.random() * words.length -1)
  const word = useSignal(words[newIndex])
  const currentGuess = useSignal('');
  const currentGuessCount = useSignal(0);
  const guessesAccuracy = useSignal<string[]>(['rrrrr', 'rrrrr', 'rrrrr', 'rrrrr', 'rrrrr']);
  const guesses = useSignal(['     ', '     ', '     ', '     ', '     ']);
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
          currentGuess.value = '';
          currentError.value = 'not quite...';
          currentGuessCount.value++;
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

  return(
    <div>
      {word.value}
      <br>
      </br>
      {guesses.value.map((guess, i)=>{
        return <Guess guess={guess} guessAccuracy={guessesAccuracy.value[i]}/>
      })}

      <Guess guess='     ' guessAccuracy='rrrrr'/>


      <br></br>
      {currentGuess.value}
      <br></br>
      <input value={currentGuess.value} onChange= { (e)=> currentGuess.value =(e.target as HTMLTextAreaElement).value}></input>
      <button onClick={(e) => {e.preventDefault(); checkGuess()}}>GUESS</button>
      <p>{currentError.value}</p>
    </div>

  )

}