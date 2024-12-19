import React from 'react'
 const SummaryCard=({icon,text,number,color})=>{
    return(
        <div className="rounded flex bg-white " >
            <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
              {icon}
            </div>
            <div className="pl-4 py-1 flex-grow">
                <p className='text-lg font-sevillana'>
                 {text}
                </p>
                <p className="text-xs text-grey-400 font-sevillana">
                  {number}
                </p>
            </div>
        </div>
    )
    
 }
export default SummaryCard