import { signal } from "@preact/signals";

function createPointState(){
  const points = signal(0);

  const addPoints = (newPoints:number) => {
    points.value = points.value += newPoints;
  }

  return{points, addPoints};
}

export default createPointState();