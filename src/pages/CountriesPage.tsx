import { useSignal } from "@preact/signals";
import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik"
] as const;

  type capital = (typeof FILTERABLE_CAPITALS)[number];

  interface Country{
    name:{
      common:string;
    };
    captial:string;
  }


const CountriesPage = () => {
  const selectedCountry = useSignal<capital>(`${FILTERABLE_CAPITALS[0]}`);
  const country = useSignal([]);

  function getCountry(capital : typeof selectedCountry){
    axios.get(`https://restcountries.com/v3.1/capital/${capital}`).then(
      (response) => {country.value = (response.data[0].altSpellings),
      console.log(country.value)}
    ).catch(
      (error) => console.log(error)
    )
  }

  return(
  <div><h1>React Interview</h1>
    <h2>Test</h2>
    <label>Select country by capital: </label>
    <select onChange={(e)=> {selectedCountry.value = (e.target as HTMLTextAreaElement).value as capital; getCountry(selectedCountry)}}>
      {FILTERABLE_CAPITALS.map((capital:capital)=>
        <option>
          {capital}
        </option>
      )}

    </select>
    <div>
    {country.value.map(
      (country)=>
      <p>{country}</p>
    )}
    </div>
  </div>

  )

}

export default CountriesPage;
