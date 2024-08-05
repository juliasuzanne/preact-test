import { useSignal } from "@preact/signals";

export function Calculator(){
  const currentDigit = useSignal(0);
  const currentNum = useSignal(null);
  const buttonNumbers = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 0, '.']
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
    prevOperator.value = operator.value;
    operator.value = operand;
    if(currentNum.value !==null && currentNum.value !== '' && firstEntry.value === false){
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
    else if(firstEntry.value === true){
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
    <div>
      <h3>{previousNum.value}</h3>
      <h3>{operator.value}</h3>
      <h1>{currentNum.value}</h1>

      <button onClick={() => handleAddOperand('+')}>
        +
      </button>
      <button onClick={() => handleAddOperand('-')}>
        -
      </button>
      <button onClick={() => handleAddOperand('*')}>
        *
      </button>
      <button onClick={() => handleAddOperand('/')}>
        /
      </button>
      <button onClick={() => handleAddOperand('=')}>
        =
      </button>

      {
        buttonNumbers.map((num)=>{
          return<button onClick={()=> addToCurrentNum(num)}>{num}</button>
        })
      }
       <button onClick={goBackOne}>
        back
      </button>
      <button onClick={clear}>
        clear
      </button>

    </div>
  )

}