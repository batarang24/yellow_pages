import { useLocation } from "react-router"
import { db } from "./firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import * as Yup from 'yup'
import { Field, Formik } from "formik";
function User(){
    //const location=useLocation();
    function setter(e){
        e.preventDefault()
        //console.log(val)
        console.log(e.target)
    }

    const useridval=async(val)=>{
        let error;
        const collection=collection('users')
        const a=await getDocs(collection)
        console.log(a)
    }
    const initialValues={
        name:'',
        userid:'',
        location:''
    };
   // var docref=doc(db,"users")
    function submit(e)
    {
        
    }
    
    const validationSchema=Yup.object({
        name:Yup.string().required("Required")
        

    })
    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
            <Field  name="userid" id="userid" validate={useridval}/>
            <Field  name="username" id="username"/>
            <Field name="location"/>
            <button type="submit"></button>
        </Formik>
        
    )
}
export default User