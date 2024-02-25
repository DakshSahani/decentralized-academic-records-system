import {Link} from "react-router-dom"
import { ReactTyped } from "react-typed";

export default function LandingPage(){
    return (
    <div className="w-full px-9 flex gap-8 justify-between items-center">
        <div className="w-[40vw]">
            <h1 className="text-5xl uppercase">
                <span className="text-primary">Verify</span> 
                {" "}your Academic records with{" "}
                <ReactTyped 
                    className="text-primary"
                    strings={["ease.", "transparency.", "efficiency."]}
                    typeSpeed={100}
                    loop
                    backDelay={20}
                    showCursor={true} 
                />
            </h1>
            <p className="my-8 text-gray-700">
                Introducing a decenteralized academic records storing system based on <span className="text-primary opacity-75">MOI technology</span>.
                Institutes can upload their students data and courses attended by them.
                This records is decentralized and can be verified from anywhere, by anyone.
            </p>
            <Link to="/records">Get Started</Link>
        </div>
        <img className="h-[65vh]" src="./moi_landingPage.svg" alt="landing page"/>        
    </div> 
    );
}