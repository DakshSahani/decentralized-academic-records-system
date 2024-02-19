import { useAppContext } from "../context/Context";
import AutoTypeText from "./AutoTypeText";

export default function Protected({children}) {
  const { wallet } = useAppContext(); 
  
  if(wallet) {
    return children;
  }

  return (
    <section className="w-full h-full flex flex-col gap-12 justify-around items-center">
      <div className="w-fit min-w-[30vw]">
        <AutoTypeText text="Please Login to Proceed." className="pl-8 text-4xl font-bold text-center w-full" focusIndx={1}/>
      </div>
      <img src="/please-login.svg" alt="Please Login" className="w-[75vw] sm:w-[45vw] md:w-[35vw]"/>
    </section>
  );
}

