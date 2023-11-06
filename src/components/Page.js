import { FieldValue, Firestore, arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { auth, db } from "./firebase"
import { async } from "@firebase/util"

function Page(){
    const params=useParams()
    console.log(params)
    const[help,shelp]=useState(0)
    const[user,suser]=useState('')
    const[req,sreq]=useState([])
    const[load,sloading]=useState(true)
    const[frnds,sfrnds]=useState([])
    const[requested,srequested]=useState(false)
    const request=async(e)=>
    {
        const docref=doc(db,"users",user)
        const uref=updateDoc(docref,{
            'requests':arrayUnion({
                'id':auth.currentUser.uid,
                'state':'req'
            })
        })
    }
  
    useEffect(()=>{
        helper()
    },[req,frnds])
    const helper=async()=>{
        const collectison=collection(db,'users')
        
        const docs= (await getDocs(collectison)).docs.map(async (val)=>{
            
          
            if(val.get('userid')==params.id)
            {
                console.log('im in')
                shelp(1)
                sreq(val.get('requests'))
                console.log(req)
                req.map((eva)=>{
                    if (eva.id==auth.currentUser.uid && eva.state=="req") {
                        console.log('dsddsdsd')
                        srequested(true)

                    }
                })
                suser(val.get('uiid'))
                sfrnds(val.get('friends'))
                //console.log()
               
               
                return ;
            }
            console.log('Params'+user)
            console.log(auth.currentUser.uid)
            
        })
       // console.log(docs)
       sloading(false)

    }
    const accept=async(cumuser)=>{
        
        console.log(user)
        console.log(auth.currentUser.uid)
        const docref1=doc(db,"users",auth.currentUser.uid)
            const refer= await updateDoc(docref1,{
                'friends':arrayUnion(cumuser)
            }) 
        const docref2=doc(db,"users",cumuser)
            const uref2= await updateDoc(docref2,{
                'friends':arrayUnion(auth.currentUser.uid)
            }) 
      
        const docrefs=doc(db,"users",user)
        const uref= await updateDoc(docrefs,{
            'requests':arrayRemove({
                'id':cumuser,
                'state':'req'
                
            })
           
        })
        const uref1= await updateDoc(docrefs,{
            'requests':arrayUnion({
                'id':cumuser,
                'state':'accept'
                
            })
           
        })
    }
    const decline=async(e)=>{
        console.log('dd')
        const docref=doc(db,"users",user)
        const uref= await updateDoc(docref,{
            
            'requests':arrayRemove({
                'id':auth.currentUser.uid,
                'state':'req'
                
            })
           
        })
       
    }

    if (load) {
        return <h1>Loading...</h1>
    }
    else
    {
        
       return (help==1?
        <div>
            <h1>Welcome {user}</h1><br/>
            {user!=auth.currentUser.uid && !frnds.includes(auth.currentUser.uid)&&!requested  ?<button className="bg-pink-400" onClick={(e)=>request(e)}>Request</button>:''}
            <br/>
            <br/>
            {
                auth.currentUser.uid==user?<div>
                Friend Requests
                
                {
                    //console.log(req.length)
                   
                    req.map((val)=>{
                        return (
                           val.state=="req"? 
                            <div  key={val.id} className="flex">
                               <h1>{val.id}</h1> &nbsp;&nbsp;
                               <button onClick={(e)=>accept(val.id)}>Accept</button>&nbsp;
                               <button onClick={(e)=>decline(e)}>Reject</button>
                            </div>:''
                        )

                        
                    })
                }


            </div>:''
            }
            <div>
                Friends
                {
                    frnds.map((eva)=>{
                        return <div>{eva}</div>
                    })
                }
            </div>
        </div>
        
        :<h1>Not Found</h1>);
    }
    
      
   
  
}

export default Page