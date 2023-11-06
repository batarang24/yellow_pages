
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {auth} from './firebase'
import { useNavigate } from 'react-router'
import { useState } from 'react';
function Home() {
    const navigate=useNavigate();
    const [username,setuser]=useState()
 //console.log(formik.errors)
    function searchchange(e)
    {
        
    }
    function signout(e){
        auth.signOut()
        navigate('/')
    }
    return(
        <div className='bg-yellow-500 h-80 '>
            <input type='text' onChange={(e)=>searchchange(e)} value={username} />
           
        </div>
    );
}

export default Home;