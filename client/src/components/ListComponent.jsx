import { Link } from "react-router-dom";

export default function ListComponent({heading, id, to,add, ...other}) {
  return (
    <div
        className={`${add && "flex lg:hidden"} w-full p-2 mb-4 border flex ${add?"bg-[#2563eb] justify-center":"border-gray-500 justify-between"} rounded-2xl items-center`}
        {...other}
    >
            <p className={`text-sm sm:text-base md:text-xl ${add && "text-white text-2xl"}`}>{heading}</p>
            {add || <div className="flex items-center gap-2">
                <p className="text-sm sm:text-base text-gray-500">
                    id
                </p>
                <p className="text-sm sm:text-base px-1 sm:px-2 py-1 rounded-lg bg-gray-400 text-white">
                    {id}
                </p>
                <Link className="text-sm sm:text-base px-1 sm:px-2 py-1 rounded-lg bg-primary text-white hover:cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]" to={to}>
                  courses 
                </Link>
            </div>}
    </div>
  )
}
