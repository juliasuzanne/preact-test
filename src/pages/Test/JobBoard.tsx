import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";

interface JobPost{
  by: string,
  id: number,
  title: string,
  type: string,
  url: string
}

export default function JobBoard(){
  const jobIds = useSignal([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  const currentIndex = useSignal(0);
  const stoppingIndex = useSignal(6);

  
  const handleGetJobIDs = async()=>{
    try{
      const ids = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
      if(ids.ok){
        const jsonIds = await ids.json();
        jobIds.value = jsonIds;
        handleGetJobInfo();
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const handleGetJobInfo = async() =>{
    try{
      console.log(jobIds.value[currentIndex.value]);
      const job = await fetch(`https://hacker-news.firebaseio.com/v0/item/${jobIds.value[currentIndex.value]}.json`);
      const jsonJob = await job.json();
      if(job.ok){
        if(jobPosts){
          setJobPosts([...jobPosts, jsonJob]);
          console.log(jobPosts);
        }
        else{
          setJobPosts([jsonJob]);
          console.log(jobPosts);
        }
      
        if(currentIndex.value < stoppingIndex.value){
          currentIndex.value++;
        }
        else{
          stoppingIndex.value = currentIndex.value + 6;
        }
      }
     

    }catch(error){
      console.log(error);
    }

  }



  useEffect(()=>{
    handleGetJobIDs();
  }, []);

  useEffect(()=>{
    if(jobIds.value.length > 0){
      handleGetJobInfo()
    }  
  }, [currentIndex.value])


return(
  <div>
    <h1>Job Board</h1>
    {jobPosts.map((job)=>{
      return<div>
      <p>{job.by}</p>
      <p>{job.url}</p>
      </div>
    })}
  <button onClick={()=> {currentIndex.value++}}>Load More</button>
  </div>
)
}

function JobCard({url, id, title}){
  return(
    <div>
      
    </div>
  )

}