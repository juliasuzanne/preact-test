import { useSignal } from "@preact/signals";
import axios from "axios";
import { useEffect, useState } from "preact/hooks";

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
    capital:string;
  }


const CountriesPageAlt = () => {
  const selectedCountry = useSignal<capital>(`${FILTERABLE_CAPITALS[0]}`);
  const country = useSignal<Country[]>();
  const countries = useSignal<Country[]>([]);

  function getCountry(capital : capital){
      country.value = countries.value.filter((country)=> country.capital == `${capital}`);
      // console.log('COUNTRY' + country.value[0].name.common);
    }
    

  function getCountryList(){
     axios.get(`${BASE_URL}/all`).then(
      (response) => {countries.value = response.data;
      console.log(response.data);
      console.log(countries.value[0].name.common);
    } ).catch(
        (error)=> console.log(error)
      )
  }

  useEffect(()=>
    getCountryList(), []
  )

  return(
  <div><h1>React Interview</h1>
    <h2>Test</h2>
    <label>Select country by capital: </label>
    <select onChange={(e)=> {selectedCountry.value = (e.target as HTMLTextAreaElement).value as capital; getCountry(selectedCountry.value)}}>
      {FILTERABLE_CAPITALS.map((capital:capital)=>
        <option>
          {capital}
        </option>
      )}

    </select>

    <div>
    {country.value ?
      country.value.map((country)=> <p>{country.name.common}, {country.capital}</p>) :
       countries.value.map((country)=> <p>{country.name.common}, {country.capital}</p>)
    }
    </div>
  </div>

  )

}

export default CountriesPageAlt;
