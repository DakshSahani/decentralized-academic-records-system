import { Link } from "react-router-dom";

export default function HomePage({wallet}) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-8 justify-evenly items-center">
      <Link 
        className="p-10 border border-black rounded-2xl flex flex-col justify-around items-center gap-8 hover:cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
        to="/view"
      >
          <img className="w-[40vw] md:w-[20vw]" src="./view.svg" alt="upload" />
          <h3>View Records</h3>
      </Link>

      <Link 
        className="p-6 md:p-8 border border-black rounded-2xl flex flex-col justify-around items-center gap-8 hover:cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]"
        to="/upload"
      >
          <img className="w-[40vw] md:w-[22vw] my-6" src="./upload.svg" alt="upload" />
          <h3>Upload Records</h3>
      </Link>
    </div>
  );
}