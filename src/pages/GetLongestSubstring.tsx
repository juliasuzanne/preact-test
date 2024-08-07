import { useSignal } from "@preact/signals";

export default function GetLongestSubstring(){
  const stringToTest = useSignal('');
  const longestSubstring= useSignal('');

  const getLongestSubstring = (testString: string) => {
    let prevString = [];
    let longestString = [];
    let prevRecord = 0;
    let currentRecord = 0;
    for (let i = 0; i < testString.length; i++) {
      if (testString[i] === testString[i + 1]) {
        if (currentRecord > prevRecord) {
          longestString.push(testString[i]);
          prevRecord = currentRecord;
          prevString = longestString;
          currentRecord = 0;
          longestString = [];
        } else {
          currentRecord = 0;
          longestString = [];
        }
      } else {
        longestString.push(testString[i]);
        currentRecord++;
      }
    }

    if(prevString.length > longestString.length){
      longestSubstring.value = prevString.join("");

    }
    else if(prevString.length <= longestString.length){
      longestSubstring.value = longestString.join("");
    }

  };

  return(
    <div>
      <input onChange={((e)=> stringToTest.value = (e.target as HTMLTextAreaElement).value)}></input>
      <button onClick={()=>getLongestSubstring(stringToTest.value)}>Click Here to Get Longest Substring of unique characters!</button>
      <h1>Result:</h1>
      <p>{longestSubstring? longestSubstring: 'Please add input'}</p>
    </div>
  )
}