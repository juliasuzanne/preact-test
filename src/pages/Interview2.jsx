import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import axios from "axios";

export default function Interview2() {
  const count = useSignal(0);
  let newData = useSignal();
  function getApiPerson() {
    axios
      .get("https://randomuser.me/api")
      .then((response) => {
        (newData.value = response.data), console.log(response.data);
      })
      .catch((error) => console.log(error.messages));
  }

  useEffect(() => {
    getApiPerson();
  }, []);
  return (
    <div>
      <h2>Counter</h2>
      <h4>Counter value: {count}</h4>
      <button onClick={() => count.value++}>count more!</button>
    </div>
  );
}
