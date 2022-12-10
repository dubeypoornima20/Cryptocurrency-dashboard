import React, { useEffect, useState } from 'react'
import axios from 'axios'
function NewsFeed() {
  const[articles,setArticle]=useState(null)
  useEffect(()=>{
    const options = {
      method: 'GET',
      url: 'https://crypto-update-live.p.rapidapi.com/news',
      headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setArticle(response.data)
    }).catch(function (error) {
      console.error(error);

    });
}, [])
  console.log(articles)

  const first10Articles=articles?.slice(0,10)

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {first10Articles?.map((article,_index)=>(
        <div key={_index}>
          <a href={article.URL}><p>{article.Title}</p></a>
        </div>))}

    </div>
  )
}

export default NewsFeed
