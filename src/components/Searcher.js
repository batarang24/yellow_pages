import React, {useState, useEffect} from 'react'
import axios from 'axios';

function Searcher(props) {
    const [searchKey, setSearchKey] = useState("")
    const [inp,sinp]=useState('')
    const [tracks, setTracks] = useState([])
    const [names,snames]=useState([])
    const [access_token,stoken]=useState('')
    const CLIENTID="e0524c922bb048acb6ac505c33d274d1"
    const CLIENTSEC="ef7debd3d89a4a5181248693139ce09e"
    useEffect(()=>{
        var authparms={
            method:'POST',
            headers:{
                'Content-type':'application/x-www-form-urlencoded'
            },
            body:'grant_type=client_credentials&client_id='+CLIENTID+'&client_secret='+CLIENTSEC
        }
        fetch('http://accounts.spotify.com/api/token',authparms)
        .then(result=>result.json())
        .then(data=>stoken(data.access_token))
        .catch((error)=>console.log(error))
    },[])
    function namer(name){
        sinp(name.name)
    }
    
    
    const searchArtist = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
      
        var artistID = data.artists.items[0].id
        console.log(data)
        var img=data.artists.items[0].images[0]['url']
        console.log(img)

        var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                limit: 10,
                market: 'US'
            }
        })

        setTracks(artistTracks.data.tracks);
    }
    const ssearcher =async(e)=>{
        sinp(e.target.value)
        const val= e.target.value?e.target.value:'ani';
        console.log(val)
       // const val='ani'
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: val,
                type: "artist"
            }
        })
        snames([])
        console.log(data)
       data.artists.items.map((item)=>{
             snames(old=>[...old,{
                'name':item.name,
                'images':item.images,
                'url':item.external_urls.spotify
             }])
        })  
        console.log(names)
        //snames([])

    }
    return (
      <>
      <div className="SearchForm">
     
        <input
          className ="Name" 
          type="text" 
          placeholder="Search By Artist Name ..."
          onChange={(e) => ssearcher(e)}
          value={inp}
          />
        <button onClick={searchArtist}>Search</button> 
      </div>
      {
        names.slice(0, 5).map(name => (
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

export default Searcher