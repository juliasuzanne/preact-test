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
          <div>
            <h2>Your Results:</h2>
            <p>Agreeable: {`${((traits.value.agreeableness+15)/36 * 100).toFixed(0)}%`}</p>
            <p>Open: {`${((traits.value.openness+2)/40 * 100).toFixed(0)}%`}</p>
            <p>Neurotic: {`${((traits.value.neuroticism+10)/32 * 100).toFixed(0)}%`} </p>
            <p>Contientious: {`${((traits.value.contientiousness +15)/36 * 100).toFixed(0)}%`}</p>
            <p>Extraverted: {`${(((traits.value.extraversion+10)/32)*100).toFixed(0)}%`}</p>
          </div>

          <div>
            <h1>The Big 5 Explained</h1>
            <h2>This test is not any kind of diagnosis or end-all-be-all of personality. The explanations here are based on a synthesis of things I've read or lectures I've listened to. Additionally, there are some psyhcologists that interpret data to state that personality is flexible and changing over time. This is especially relevant if you are under the age of 26, with a slow decline in changes over time. If you see results you don't like, or don't agree with, see what your friends or family think. In fact, in some studies the results an individual reported have been off by over 20% when compared to family and friends' reports of the same individual when taking the quiz on their behalf. Reflect on how these traits might manifest in the ways you show up, and how you can either embrace, strengthen, or change your habits to be the person you want to be. Take from it what helps you understand yourself.</h2>
            <h2>Agreeable</h2>
            <p>Agreeable people are team players. They are more concerned with the social group versus individual needs and goals. Studies have shown that female brains are, on average, more prone to exhibit traits of agreeableness. </p>
            <h2>Open</h2>
            <p>Openness refers to creativity and intellectual pursuit. People who are extremely open tend to have a higher EQ, and might value their gut feelings and feel more confident in their sense of self and logic. Studies have shown that openness is more highly associated with liberal leaning minds.</p>
            <h2>Neurotic</h2>
            <p>Neuroticism might sound related to mental illness or irrationality, but it is defined her as a propensity towards negative emotion. To be more highly effected by negative stimuli or thought patterns. Again, studies have shown that women tend to score higher in this category and theories tend to explain this from an evolutionary standpoint.</p>
            <h2>Contientious</h2>
            <p>Contientious people tend to be organized, orderly, and goal oriented. They pride themselves on their strong work ethic and ability to adhere to and create structure. Studies have shown that this trait is more highly associated with conservative leaning politics. </p>
            <h2>Extraverted</h2>
            <p>Extraversion is a term most people are familiar with. It refers to the qualities of being highly sociable, friendly, and outgoing. As far as I'm aware, this trait is not more highly associated with any demographic but it has been argued that extraversion and neuroticism may have a somewhat inverse relationship.</p> 

          </div>
    </div>
  )
}

