import { useSignal } from "@preact/signals";
import './calculator.css'

export function Calculator(){
  const currentDigit = useSignal(0);
  const currentNum = useSignal(null);
  const buttonNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8 , 9]
  const firstEntry = useSignal(true);
  const previousNum = useSignal(0);
  const prevOperator = useSignal('');
  const operator = useSignal('');

  function goBackOne(){
    if(currentNum.value.length >= 1){
      currentNum.value = currentNum.value.substring(0, currentNum.value.length - 1);

    }
    }

  function addToCurrentNum(newNum:number | string){
    if(typeof newNum === 'number'){
      if(currentNum.value === null){
        currentNum.value = newNum.toString();

      }
      else{
        currentNum.value = currentNum.value + newNum.toString();

      }
    }
    else if(newNum === '.'){

      if(!currentNum.value.includes('.')){
        if(currentNum.value === null){
          currentNum.value = ".";
  
        }
        else{
          currentNum.value = currentNum.value + '.';
      }
    }
  }
}

  function handleAddOperand(operand:string){
    console.log(currentNum.value);
    prevOperator.value = operator.value;
    operator.value = operand;
    if(currentNum.value !==null && currentNum.value !== '' && currentNum.value !==0 && firstEntry.value === false){
      switch(prevOperator.value){
        case('+'):
          currentNum.value = previousNum.value + parseFloat(currentNum.value);
          break;
          case('-'):
          currentNum.value = previousNum.value - parseFloat(currentNum.value);
          break;
          case('*'):
          currentNum.value = previousNum.value * parseFloat(currentNum.value);
          break;
          case('/'):
          currentNum.value = previousNum.value / parseFloat(currentNum.value);
          break;
          default: currentNum.value = 0;
      }
      
      previousNum.value = currentNum.value;
      currentNum.value = null;
    }
    else if(firstEntry.value === true && currentNum.value !==null && currentNum.value !==''){
      firstEntry.value = false;
      previousNum.value = parseFloat(currentNum.value);
      currentNum.value = null;
    }
    if(operator.value === '='){
      operator.value = '';
      currentNum.value = null;

    }

  }

  function clear(){
    currentNum.value = null;
    previousNum.value = 0;
    operator.value = '';
    firstEntry.value = true;
  }



  return(
    <div class="calc-container">
      <div class="screen">
      <h3 className="previousNum">{previousNum.value}</h3>
      <h3 className="operator">{operator.value}</h3>
      <h1 className="currentNum">{currentNum.value}</h1>
      </div>
      <div className="numbers">

      <button class="calc-button" onClick={() => handleAddOperand('+')}>
        +
      </button>
      <button class="calc-button" onClick={() => handleAddOperand('-')}>
        -
      </button>
      <button class="calc-button" onClick={() => handleAddOperand('*')}>
        *
      </button>
      <button class="calc-button" onClick={() => handleAddOperand('/')}>
        /
      </button>
  
      {
        buttonNumbers.map((num)=>{
          return<button class="calc-button" onClick={()=> addToCurrentNum(num)}>{num}</button>
        })
      }
      <button class="calc-button" onClick={()=> addToCurrentNum('.')}>.</button>
      <button class="calc-button"  onClick={goBackOne}>
        back
      </button>
      <button class="calc-button"  onClick={clear}>
        clear
      </button>
      <button class="calc-button" onClick={() => handleAddOperand('=')}>
        =
      </button>
      </div> 

    </div>
  )

}