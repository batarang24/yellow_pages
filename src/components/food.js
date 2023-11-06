


import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Food(props) {
  const [datas,sdata]=useState([])
    //https://image.tmdb.org/t/p/w1280"; ${element.poster_path} ${element.backdrop_path}
    const ACCESS_TOKEN=' eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2U4MjhmOGRkMGE4NjE5MWQzYjgzMDViZWQ4MzhlZCIsInN1YiI6IjY1MTdiOTY4OWI4NjE2MDEzYTI0YTE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lIW5_Hwiw3lrSx9naMIKPvNtluk2qhlDlH3HQ5a0Huw'
    const[inp,sinp]=useState()
    const searchMovie = async (e) => {
        var food=e.target.value

        const options = {
          method: 'GET',
          url: `https://ind-nutrient-api1.p.rapidapi.com/food/name/${food}`,
          headers: {
            'X-RapidAPI-Key': '50862da9f2msh05c9c046f8e7ebfp1c8b29jsn72d5d5744b7b',
            'X-RapidAPI-Host': 'ind-nutrient-api1.p.rapidapi.com'
          }
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
          
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
     
      </> 
    )
}

export default Food