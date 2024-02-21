import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/Context";

export default function ViewPage() {
  const navigate = useNavigate();
  const {getRecords} = useAppContext();

  useEffect(()=>{
    getRecords();
  },[])
  
  const [data, setData] = useState({
    id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/view/${data.id}`);
  }
  const handleChange = (e) => {
    const prop = e.target.name
    setData(prev => ({
      ...prev,
      [prop] :e.target.value
    }))
  }

  return (
    <div className="px-[6vw] w-full flex items-center justify-center md:justify-between">
      <div className="hidden md:block">
        <img src="/enter-student-details.svg" alt="Student Details" className="w-[30vw]"/>
      </div>

      {/* Input form */}
      <div className="md:w-[40%] lg:w-[45%] border border-gray-500 rounded-2xl p-8 py-12 flex flex-col items-between">
        <h4 className="w-full text-center">Please enter the student id</h4>
        <form onSubmit={handleSubmit} className="pt-10 flex flex-col gap-3 items-center justify-center">
          <div className="flex w-full justify-between">
            <label>Student Id</label>
            <input 
              className="w-[70%] border-2 border-[#68707D40]"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
          </div>

          <button
            className="connect-button mt-8"
            type="submit"
            onClick={handleSubmit}
          >
            Show Record
          </button>
        </form>
      </div>

    </div>
  );
}