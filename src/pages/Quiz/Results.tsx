import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, defaults } from "chart.js/auto";

import './chartdemo.css'


export default function Results({traits, show}){
  defaults.maintainAspectRatio = true;
  defaults.responsive = true;
  defaults.plugins.title.display = false;
  defaults.plugins.title.align = "center";
  defaults.plugins.title.color = "black";

  return(
    <div id="myChart" hidden={show}>
        {/* <p>Agreeableness: {((traits.value.agreeableness+15)/36).toFixed(2)}</p>
        <p>Openness: {((traits.value.openness+2)/40).toFixed(2)}</p>
        <p>Neuroticism: {((traits.value.neuroticism+10)/32).toFixed(2)}</p>
        <p>Contientiousness: {((traits.value.contientiousness +15)/36).toFixed(2)}</p>
        <p>Extraversion: {((traits.value.extraversion+10)/32).toFixed(2)}</p> */}
        <div className="dataCard customerCard">
        <PolarArea
          data={{
            labels: ['Agreeable', 'Open', "Neurotic",'Contientious', 'Extraverted'],
  
            datasets: [
              {
                label: "You Scored",
                data: [`${((traits.value.agreeableness+15)/36).toFixed(2)}`, `${((traits.value.openness+2)/40).toFixed(2)}`, `${((traits.value.neuroticism+10)/32).toFixed(2)}`, `${((traits.value.contientiousness +15)/36).toFixed(2)}`, `${((traits.value.extraversion+10)/32).toFixed(2)}`],
                backgroundColor: [
                  "blue",
                  "red",
                  "green",
                  "orange",
                  "pink",
                ],
                borderRadius: 10,
              },
            ],
         
          }}
      
          options={{
            scale: {
              min: .05,
              max: .95,
              ticks: {
                  stepSize: .1,
              }
          },
            
            plugins: {
             
              title: {
                text: "Your Big 5 Results",
              },
            },
          }}
          o

           />
      </div>

    </div>
  )
}

