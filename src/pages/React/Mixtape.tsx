import axios from 'axios';
import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import {Suspense, lazy} from 'preact/compat'
import { renderToStringAsync } from 'preact-render-to-string';

export default function Mixtape(){
  const posts = useSignal([]);
  const titles = useSignal([])
  const handleIndexPosts = async() => {
    console.log("handleIndexPosts");
    await axios.get(`https://riyl.fly.dev/infos.json`).then((response) => {
      console.log(response.data);
      posts.value = (response.data);
      console.log(posts.value[0].title);
      //console.log(posts.value[0][0].title);
      // titles.value = (posts.value.map(post => post.title));

      // console.log(titles);
    });
  };

  useEffect(() => handleIndexPosts(), [posts])


  return(
    <div>
      <h1>
        Media Consumption
        </h1>
      {`${posts.value.length}`}
      {
        posts.value.map((post)=>(
          <div>
              <h2>{post.title}</h2>
              <h3>{post.author}</h3>
              <img height="300px" src={post.photo_url}></img>
              <p>{post.category} </p>
              <p>{post.favoritepart}</p>
        </div>))

    }

      {/* {posts.value.length !== 0 ?
        posts.value.map((post)=>(
          <div>
              <h2>{post.title}</h2>
              <h3>{post.author}</h3>
              <img height="300px" src={post.photo_url}></img>
              <p>{post.category} </p>
              <p>{post.favoritepart}</p>
        </div>
        )
    
        )
        :
        <p>loading...</p>  

    } */}

      {/* {posts.value.length !== 0 ?
          <p>{posts.value[0].title}</p>:
          <p>Loading...</p>
      } */}
      
      <br></br>
      <br></br>

   
      {/* <button onClick={handleIndexPosts}>Load Posts</button> */}
      
      <a href ='/'>Back</a>
    </div>
  )
}