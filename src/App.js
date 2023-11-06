
import {BrowserRouter,Route, Routes} from "react-router-dom"
import Home from "./components/Home";
import Otp from "./components/Otp";
import Searcher from "./components/Searcher";
import Movie from "./components/movie";
import {auth} from './components/firebase'
import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import Notfound from "./components/Notfound";
import Food from "./components/food";
import Anime from "./components/anime";
import Anim from "./components/anime2";
import Viewer from "./components/Viewer";
import User from "./components/User";
import Page from "./components/Page"
import Homes from "./components/homes";


function App() {
  const [authenticated, setAuthenticated] = useState('22')

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setAuthenticated(uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
})
  return(
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Homes/>}></Route>
      <Route path="*" element={<Notfound/>}></Route>
      <Route path="users" element={<User/>}></Route>
    <Route path="/:id" element={<Page/>}/>
    <Route path="/movie" element={<Movie/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App