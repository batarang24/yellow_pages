function Hobby(params)
{
   const kelamal=params.kelamal
   const hobbyref=params.hobbyref
   const click=params.click
   {
     kelamal?<div ref={hobbyref} onClick={(e)=>click(e)}>
     {
         
         hobb.slice(0,3).map((val)=>{
             return <div key={val}>
                {val}
                &nbsp;&nbsp;<button onClick={()=>{
                    
                    console.log(val)
                }}>+</button>
                </div>
         })
     }
     </div>:''
   }
}
export default Hobby