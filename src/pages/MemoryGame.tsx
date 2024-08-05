import axios from "axios";
import { useSignal } from "@preact/signals";
import { useMemo, useState, useEffect, useContext } from "preact/hooks";
import { useErrorBoundary } from "preact/hooks";
import ErrorBoundary from "./ErrorBoundary";
import { Card } from "./Card";
import { PointState } from "..";

export default function MemoryGame(){
  //get the array of images from axios X
  //splice array of images into desired number of matches
  //display number of matches
  //randomize position in a grid
  //click to reveal card game, keep track of state (0, 1 or 2 cards revealed)
  //if 2 cards revealed, cards stay turned up and they are a match, match ++
  //if not a match, flip back over and reset state
  const {points, addPoints} = useContext(PointState);
  const images = useSignal([]);
  const numMatches = useSignal(4);
  const gameMatches = useSignal(4);
  const correctGuesses = useSignal(0);
  const [error, setError] = useState(null);
  const prev = useSignal(null);
  const current = useSignal(null);
  const prevId = useSignal(null);
  const currentId = useSignal(null);
  const correctlyGot = useSignal([]);

  if(numMatches.value < 11 && numMatches.value > 0){
    gameMatches.value = numMatches.value;
  }


  if(error){
    return(
      <div>
        <p>Error! Message: {error.message}</p>
        <button onClick={() => setError(null)}>Reset</button>
      </div>
    )
  }

  function handleGetImages(){
      axios.get(`https://thesisblog.fly.dev/photos.json`).then(
        (response) => {console.log(response.data);
        images.value = (response.data.splice(0, gameMatches));
        images.value = ([...images.value, ...images.value]);
        console.log(images.value);
        shuffleImages();
        console.log(images.value);
      }
       
      ).catch(
        (error) => console.log(error)
      )
  }

  useEffect(handleGetImages, [images, gameMatches]);


  type Image = {
    id: number;
    name: string;
    url: string;
    abovewriting: string;
    belowwriting: string;
    created_at: string;
    updated_at: string;
    post_id: number;
  }

  function handleChangeGame(e: Event){
    e.preventDefault();
    correctGuesses.value = 0;
    if(numMatches.value < 11 && numMatches.value > 0){
      gameMatches.value = numMatches.value;
      handleGetImages();
    }
    else{
      throw new Error("Could not get images");
    }

  }

  function shuffleImages(){
    let currentIndex = images.value.length;
    while(currentIndex !== 0){
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      let tempImage = images.value[currentIndex];
      images.value[currentIndex] = images.value[randomIndex];
      images.value[randomIndex] = tempImage;

    }
  }

  function resetGame(){
    prev.value= null;
    correctlyGot.value = [];
    current.value = null;
    correctGuesses.value = 0;
    currentId.value = null;
    prevId.value = null;

  }



  return(
    <div>
      <h1> Points: {points}</h1>
      <form onSubmit={handleChangeGame}>
        <input value={gameMatches.value} onChange={(e)=> numMatches.value = parseInt((e.target as HTMLTextAreaElement).value)} placeholder="How many matches?">
        </input>
        <p style={numMatches.value < 11 && numMatches.value > 0 ? 'display:none' : 'display:block'}>Please pick a number between 1 and 5</p>
        <h1>{numMatches}-Match Game</h1>
        <h2>Correct Matches: {correctGuesses.value}/{gameMatches.value}</h2>
        <button type="submit">Submit</button>
      </form>
      <div className="container">
      {images.value.length === 0 ? <p>Loading...</p> : 
      images.value.map((image, i)=>{
        return <div key={i} className="cards" height='300px' style={correctlyGot.value.includes(image.id) || prevId.value === i || currentId.value === i? `background-image: url(${image.url})`: "background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjNHlCAhNnlQ4pCIluYMG_9EPMnBMPrVovkg&s')" }onClick={()=> {  
          console.log(i, image.id);
          console.log("CORRECT: " + correctlyGot);
          if(prev.value === null){
            if(correctlyGot.value.includes(image.id)){
              prev.value = null;
              prevId.value = null;
              currentId.value = null;

            }
            else{
              prev.value = image.id;
              prevId.value = i;
              currentId.value = null;


            }
          }
          else if(current.value ===null){
            if(correctlyGot.value.includes(image.id)){
              current.value = null;
              currentId.value = null;

            }
            else{
              current.value = image.id;
              currentId.value = i;

              if(prev.value === current.value){
                correctGuesses.value++;
                console.log('matched! ' + current.value + ' & ' + prev.value);
                correctlyGot.value = [...correctlyGot.value, prev.value];
                console.log(correctlyGot);
                prev.value = null;
                prevId.value = null;
                current.value = null;
                currentId.value = null;
                if(correctGuesses.value === gameMatches.value){
                  addPoints(gameMatches.value * 50);
                  resetGame();
                }
              }
              else{
                console.log('no match ' + current.value + ' & ' + prev.value)
                prev.value = null;
                current.value = null;
              }
            }
            
          }
        }}></div>
        })
        }
        
        
      </div>

      
    </div>
    

  )
}

// {images.value.length === 0 ? <p>Loading...</p> : 
// images.value.map((image)=>{
//   return <img className="cards" height='300px' src={image.url}></img>
// })
// }