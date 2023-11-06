


import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Anim(props) {
  const [datas,sdata]=useState([])
    //https://image.tmdb.org/t/p/w1280"; ${element.poster_path} ${element.backdrop_path}
    //const ACCESS_TOKEN=' eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyY2U4MjhmOGRkMGE4NjE5MWQzYjgzMDViZWQ4MzhlZCIsInN1YiI6IjY1MTdiOTY4OWI4NjE2MDEzYTI0YTE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lIW5_Hwiw3lrSx9naMIKPvNtluk2qhlDlH3HQ5a0Huw'
    const[inp,sinp]=useState('')
    const searchMovie = async (e) => {
        sinp(e.target.value)
        const food=e.target.value
        console.log(food)
        const options = {
          method: 'GET',
          url: `https://api.jikan.moe/v4/characters?page=1&limit=10&q=${food}`,
         
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
            sdata([])
            response.data.data.map((item)=>{
                // console.log(item.title)
                sdata(old=>[...old,{
                                'image':item.images.jpg.image_url,
                                'name':item.name,
                            }])
           })  
           console.log(datas)
        } catch (error) {
            console.error(error);
        }
       // sdata([])
       //console.log(datas.data)
        
          
    }
  

    
    return (
      <>
      <div className="SearchForm">
     
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By anime name..."
          onChange={(e)=>searchMovie(e)}
          value={inp}
          />
        <button onClick={(e) => searchMovie(e)}>Click me</button>
        
      </div>
      {
        
        datas.slice(0, 5).map(name => (
            
            <div key={name.name}>
                <ul>
                    <li onClick={(e)=>{sinp(name.name)}}> {name.name}</li>
                </ul>
            </div>
        ))
      }
      </> 
    )
}

export default Anim