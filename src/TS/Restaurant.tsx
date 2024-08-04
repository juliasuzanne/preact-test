import restaurants from './restaurants'
import {useSignal} from '@preact/signals'
import { useEffect, useMemo } from 'preact/hooks';

export default function Restaurant(){

  let dollarSigns = useSignal('$$');
  let deliveryTimeMax = useSignal(90);
  let maxDistance = useSignal('10');
  let result: string;
  const priceBracket = `${dollarSigns.value.length}`;

  const filteredRestaurants = restaurants.filter((restaurant) => {
    if(parseInt(restaurant.priceBracket) > parseInt(priceBracket)){
      return false;
    }
    if(restaurant.deliveryTimeMinutes > deliveryTimeMax.value){
      return false;
    }
    if(parseInt(restaurant.distance) > parseInt(maxDistance.value)){
      return false;
    }
    return restaurant;
  })

  useEffect(() =>
  {filteredRestaurants},
    [dollarSigns.value, deliveryTimeMax.value, maxDistance.value])

  return(
    <div>
      <div className="options">
      <select onChange={(e) => dollarSigns.value = (e.target as HTMLTextAreaElement).value} value={dollarSigns}>
        <option value = '$'>$
        </option>
        <option value = '$$'>$$
        </option>
        <option value = '$$$'>$$$
        </option>
        <option value = '$$$$'>$$$$
        </option>
      </select>
      <select onChange={(e) => deliveryTimeMax.value = parseInt((e.target as HTMLTextAreaElement).value) }value = {deliveryTimeMax}>
          <option value = '90'>
            1.5hr
          </option>
          <option value = '60'>
            1hr
          </option>
          <option value = '30'>
            0.5hr
          </option>
      </select>
      <select onChange={(e)=> maxDistance.value = (e.target as HTMLTextAreaElement).value} value={maxDistance}>
        <option value = '10'>
          10 miles
        </option>
        <option value = '5'>
          5 miles
        </option>
        <option value = '2'>
          2 miles
        </option>
      </select>
      <p>Searching for price bracket {priceBracket} with a maximum delivery time of {deliveryTimeMax}, {maxDistance} miles away or closer. </p>
      </div>
      <div className="results">
        {filteredRestaurants.length === 0 ? `There are no results with these parameters` : `We found ${filteredRestaurants.length} restaurants, including:`}
        {filteredRestaurants.map((restaurant)=>
        <p>{restaurant.name}</p>
        )}
      </div>


    </div>

  )

}