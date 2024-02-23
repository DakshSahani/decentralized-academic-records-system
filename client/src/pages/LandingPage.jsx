import {useNavigate} from "react-router-dom"

export default function LandingPage(){
    const navigate = useNavigate()

    return <div className="w-full px-9 flex gap-8 justify-between items-center">
        <div className="w-[40vw]">
            <h1 className="text-3xl">Verified your Academic records with ease</h1>
            <p className="my-8">
                Introducing a decenteralized academic records system based on MOI technology.
                Institutes can upload their students data and courses attended by them.
                This records is decentralized and can be verified from anywhere, by anyone.
            </p>
            <button 
                className="connect-button !mx-0 hover:bg-[#1d4ed8]"
                onClick={()=>navigate("/records")}
            >
                Get Started
            </button>
        </div>
        <img className="h-[65vh]" src="./moi_landingPage.svg" alt="landing page image"/>        
    </div> 
}