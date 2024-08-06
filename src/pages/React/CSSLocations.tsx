import './csstest.css'

export function CSSLocations({images}){
  console.log(images.value.map(image => (image)));

return(
  <div class="locations-container">
    <h2>
      Tea of the Month
    </h2>
    <h4>
      What's Steeping at The Tea Cozy?
    </h4>
    <div class="location-img-container">
      {images.value.map((image) => <div className="location-blocks"><img class="location-img" src={image.src} /><h4 class="location-title">{image.title}</h4></div>)}
      </div>
    </div>
)
}