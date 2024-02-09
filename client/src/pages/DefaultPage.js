import { useEffect, useState } from "react";

export default function DefaultPage() {
  // const finalMessage = "Please Login to Proceed";
  // const [message, setMessage] = useState("");
  // useEffect(()=>{
    // const intervalId = setInterval(()=>{
    //     setMessage(finalMessage)
    // }, 500);
    
    // return ()=>{
    //     clearInterval(intervalId);
    // }
  // }, []);

  return (
    <main className="w-full h-full flex flex-col gap-12 justify-around items-center">
      <h2>
        Please <span className="text-[#1D4ED8]">Login</span> to Proceed.
      </h2>
      <img src="/please-login.svg" alt="Please Login" className="w-[30vw]"/>
    </main>
  );
}
