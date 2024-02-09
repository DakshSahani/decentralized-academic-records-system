import { Link } from "react-router-dom";

export default function HomePage({wallet}) {
  return (
    <main className="w-full h-full flex justify-evenly items-center">
      <Link 
        className="p-10 border border-black rounded-2xl flex flex-col justify-around items-center gap-8 hover:cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
        to="/view"
      >
          <img className="w-[20vw]" src="./view.svg" alt="upload" />
          <h3>View Records</h3>
      </Link>

      <Link 
        className="p-10 border border-black rounded-2xl flex flex-col justify-around items-center gap-8 hover:cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
        to="/upload"
      >
          <img className="w-[20vw] my-8" src="./upload.svg" alt="upload" />
          <h3>Upload Records</h3>
      </Link>
    </main>
  )
}