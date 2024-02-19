import { useEffect, useState } from "react";

export default function AutoTypeText({text, className, focusIndx=-1}) {
  const finalMessage = text + " ";
  const [message, setMessage] = useState(" ");
    
  useEffect(()=>{
    if((message.length === finalMessage.length-1) && (!message.endsWith("|")))
        return
    if(message.length === finalMessage.length) {
        setMessage(message=>message.substring(0, message.length-1));
    }
    const intervalId = setTimeout(()=>{
        setMessage(message=>message.substring(0, message.length-1) + finalMessage.charAt(message.length - 1) + "|");
    }, 50);
    
    return ()=>{
        clearTimeout(intervalId);
    }
    // eslint-disable-next-line
  }, [message]); 

  if(!text || text==="") return <p></p>

  return (
    <p className={className} >
      {
        message.split(" ").map((word, indx)=>{
          if(indx === focusIndx) 
            return <span className="text-[#1D4ED8]" key={indx}>{word + " "}</span>
          return <span key={indx}>{word + " "}</span>
        })
      }
    </p>
  )
}
