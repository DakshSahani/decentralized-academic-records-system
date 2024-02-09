import { useEffect, useState } from "react";

export default function Protected({wallet, children}) {
  const finalMessage = "Please Login to Proceed. ";
  const [message, setMessage] = useState(" ");
  useEffect(()=>{
    if(message.length == finalMessage.length) {
      setMessage(message.substring(0, message.length-1));
    }
    const intervalId = setTimeout(()=>{
      setMessage(message.substring(0, message.length-1) + finalMessage.charAt(message.length - 1) + "|");
    }, 50);
    
    return ()=>{
      clearTimeout(intervalId);
    }
  }, [message]);  
  
  if(wallet) {
    return children;
  }

  return (
    <main className="w-full h-full flex flex-col gap-12 justify-around items-center">
      <div className="w-fit min-w-[30vw]">
        <div className="text-4xl font-bold">
          {
            message.split(" ").map((word, indx)=>{
              if(indx === 1) 
                return <span className="text-[#1D4ED8]" key={indx}>{word + " "}</span>
              return <span key={indx}>{word + " "}</span>
            })
          }
        </div>
      </div>
      <img src="/please-login.svg" alt="Please Login" className="w-[30vw]"/>
    </main>
  );
}

