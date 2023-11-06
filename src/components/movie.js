


import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Movie(props) {
  const [datas,sdata]=useState([])
    //https://image.tmdb.org/t/p/w1280"; ${element.poster_path} ${element.backdrop_path}
    const ACCESS_TOKEN=' eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2U4MjhmOGRkMGE4NjE5MWQzYjgzMDViZWQ4MzhlZCIsInN1YiI6IjY1MTdiOTY4OWI4NjE2MDEzYTI0YTE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lIW5_Hwiw3lrSx9naMIKPvNtluk2qhlDlH3HQ5a0Huw'
    const[inp,sinp]=useState()
    const searchMovie = async (e) => {
        const movie=e.target.value
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer'+ACCESS_TOKEN
          }
        };
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,options)
        //console.log(data)
        sdata([])
       // console.log(data)
       //console.log(data.results)
       data.results.map((item)=>{
             // console.log(item.title)
             sdata(old=>[...old,{
                'backdrop_path':item.backdrop_path,
                'title':item.title,
                'poster':item.poster_path
             }])
        })  
        console.log(datas)
          
    }
  

    
    return (
      <>
      <div className="SearchForm">
     
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By Movie name..."
          onChange={(e) => searchMovie(e)}
          value={inp}
          />
        
        
      </div>
      {
        datas.slice(0, 5).map(name => (
            <div key={name.poster}>
                <ul>
                    <li onClick={(e)=>{sinp(name.name)}}> {name.title}</li>
                </ul>
            </div>
        )) 
      }
      </> 
    )
}

export default Movie