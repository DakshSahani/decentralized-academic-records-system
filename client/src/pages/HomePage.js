import { Link } from "react-router-dom";

export default function HomePage({wallet}) {
  return (
    <main className="w-full h-full flex justify-evenly items-center">
      <Link 
        className="p-10 border border-black rounded-2xl flex flex-col justify-around gap-8 hover:cursor-pointer"
        to="/view"
      >
          <img src="./view.png" alt="upload" />
          <h3>View Records</h3>
      </Link>

      <Link 
        className="p-10 border border-black rounded-2xl flex flex-col justify-around gap-8 hover:cursor-pointer"
        to="/upload"
      >
          <img src="./upload.png" alt="upload" />
          <h3>Upload Records</h3>
      </Link>
    </main>
  )
}