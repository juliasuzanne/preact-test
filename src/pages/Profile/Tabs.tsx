import { useState, useEffect } from "preact/hooks";

export default function Tabs() {
  const [currentButton, setCurrentButton] = useState('');
  useEffect(()=> console.log(currentButton==='html'), [currentButton]);

  return (
    <div>
      <div>
        <button style={currentButton==='html' ? "background-color : blue" : "background-color : none"}  onClick={()=> {setCurrentButton('html'); console.log(currentButton)}}>HTML</button>
        <button style={currentButton==='css' ? "background-color : blue" : "background-color : none"} onClick={()=> setCurrentButton('css')}>CSS</button>
        <button style={currentButton==='js' ? "background-color : blue" : "background-color : none"}  onClick={()=> setCurrentButton('js')}>JavaScript</button>
      </div>
      <div>

        <p style={currentButton==='html'? 'display: block' : 'display: none'}>
          The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.
        </p>
        <p style={currentButton==='css'? 'display: block' : 'display: none'}>
          Cascading Style Sheets is a style sheet language
          used for describing the presentation of a document
          written in a markup language such as HTML or XML.
        </p>
        <p style={currentButton==='js'? 'display: block' : 'display: none'}>
          JavaScript, often abbreviated as JS, is a
          programming language that is one of the core
          technologies of the World Wide Web, alongside HTML
          and CSS.
        </p>
      </div>
    </div>
  );
}
