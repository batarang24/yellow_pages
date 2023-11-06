import { useLocation } from "react-router"
import { auth, db } from "./firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import * as Yup from 'yup'
import { Field, Formik,Form } from "formik";
import { getAuth } from "firebase/auth";

function User(){
    //const location=useLocation()

   
    const initialValues={
        name:'',
        userid:'',
        location:''
    };
   // var docref=doc(db,"users")
    const  submit=async(value)=>
    {
        console.log(auth.currentUser.phoneNumber)
        console.log(auth.currentUser.uid)
        //console.log(val)
        const userid=value.userid;
        console.log('hh')
        let error;
        const collectison=collection(db,'users')
        const a=(await getDocs(collectison)).docs.map(async (val)=>{
             if(val.get('userid')==userid)
             {
                console.log('there is a userid',userid)
                console.log('Userid already exists')
             }
             else {
                //.log(val.)
                const docRef = doc(db, "users", auth.currentUser.uid )
                console.log(docRef)
                const setter=await setDoc(docRef,{
                 
                    'uiid':auth.currentUser.uid,
                    'phno':auth.currentUser.phoneNumber,
                    'name':value.name,
                    'userid':value.userid,
                    'location':value.location,
                    'requests':[]
                    
                })
             }
        })
        //console.log(a)

    }
    
    const validationSchema=Yup.object({
      //  name:Yup.string().required("Required")
        

    })
    return(
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
           <Form>
            
           <Field  name="userid" placeholder="userid"/>
            <Field  name="name" placeholder="name" />
            <Field name="location" placeholder="loc"/>
            <button type="submit">submit</button>
           </Form>
        </Formik>
        
    )
}
export default User