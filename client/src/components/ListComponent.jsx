import { Link } from "react-router-dom";

export default function ListComponent({heading, id, to,add, ...other}) {
  return (
    <Link
        className={`w-full p-2 m-3 border flex ${add?"bg-[#2563eb] justify-center":"border-gray-500 justify-between"} rounded-2xl items-center hover:cursor-pointer transform transition-transform duration-300 hover:scale-[1.03]`}
        to={to}
        {...other}
    >
            <p className={`text-xl ${add && "text-white text-2xl"}`}>{heading}</p>
            {add || <div className="flex items-center gap-2">
                <p className="text-gray-500">
                    id
                </p>
                <p className="px-2 py-1 rounded-lg bg-gray-400 text-white">
                    {id}
                </p>
            </div>}
    </Link>
  )
}
