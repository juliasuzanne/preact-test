import './csstest.css'

export function CSSHeader({imgSrc}){

  return(
    <header>
    <div className="teacozy-header">
    <img className="tea-logo" src={imgSrc}></img>
    <div class="nav-buttons">
    <a href = "/">Mission</a>
    <a href = "/tea">Featured Tea</a>
    <a href = "/tea">Locations</a>
    </div>
   
  </div>
  </header>
  )
  
 
}