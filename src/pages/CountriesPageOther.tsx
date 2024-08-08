//Create a simple React app

//list of countries and capitals fetched from API
//displayed in the countries page
//each country should be in a separate component
//Each country should be displayed in a separate component
//user should be able to filter the list by capital
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
const BASE_URL = 'https://restcountries.com/v3.1';

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik"
] as const;

type Capital = (typeof FILTERABLE_CAPITALS)[number];


interface Country{
  name:{
    common:string;
  };
  capital:Capital;
}

interface CountryCardProps{
  country: {
    name:{
      common:string;
    };
    capital:Capital;
  }
}


const CountryCard = ({country}: CountryCardProps) =>{
  return(
      <p>{country.name.common}, {country.capital}</p>
      )
}

const CountriesPageOther = () => {
  //handles for country list and current capital from select
  const countries = useSignal<Country[]>([]);
  const capital = useSignal<string>('all');
  const [newCapital, setNewCapital] = useState<string>();

  //get all countries function
  const getData = async() =>{
    try{
      const response = await fetch(`${BASE_URL}/${capital.value}`);
      if(response.ok){
        const jsonData = await response.json();
        countries.value = jsonData;
      }
    }catch(error){
      console.log(error);
    }
  }

//get all countries on mount
useEffect(() =>{ getData(); }, [capital.value])

return(<div className="p-4">

  <select onChange={(e)=>capital.value = "capital/" + (e.target as HTMLTextAreaElement).value}>
    {FILTERABLE_CAPITALS.map((capital)=>
      <option value={capital}>{capital}</option>
    )}
  </select>

  {countries.value.map((country)=> 
    <CountryCard key={country.name.common} country = {country} />
  )}


  </div>)
}

export default CountriesPageOther;