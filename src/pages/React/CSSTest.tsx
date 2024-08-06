import './csstest.css'
import {h} from 'preact';
import {CSSHeader} from './CSSHeader'
import { CSSLocations } from './CSSLocations';
import { useSignal } from '@preact/signals';

export default function CSSTest(){

  document.body.style.backgroundColor="black";

  const images=useSignal([
    {src:"/img-berryblitz.jpg",
     title: 'Fall Berry Blitz Tea'
    },
    {src:"/img-spiced-rum.jpg",
    title: 'Spiced Rum Tea'
    },
    {src:"/img-donut.jpg",
    title: 'Seasonal Donuts'
    },
    {src:"/img-donut.jpg",
    title: 'Myrtle Ave Tea'
    },
    {src:"/img-bedford-bizarre.jpg",
    title: 'Bedford Bizarre Tea'
    }
  ])

  return(
    <div className="tea-container">
      <CSSHeader imgSrc=".././public/img-tea-cozy-logo.png" />
      <div className="tea-main">
        <div className="tea-titles">
        <h2 className="tea-title">Our Mission</h2>
        <h4 className="tea-title">Handpicked, Artisinally Curated, Free Range, Sustainable, Small Batch, Fair Trade, Organic Tea</h4>
        </div>
      </div>
      <CSSLocations images={images} />


      <footer>
      <h2> copyright The Tea Cozy 2017</h2>
      </footer>
    </div>
  )
}