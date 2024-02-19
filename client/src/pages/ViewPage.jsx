import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function ViewPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "",
    name: ""
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
    <div className="px-[6vw] w-full flex items-center justify-between">
      <div>
        <img src="/enter-student-details.svg" alt="Student Details" className="w-[30vw]"/>
      </div>

      {/* Input form */}
      <div className="sm:w-[50%] md:w-[35%] lg:w-[40%] border border-gray-500 rounded-2xl p-8 py-12 flex flex-col items-between">
        <h4>Please enter the student details</h4>
        <form onSubmit={handleSubmit} className="pt-10 flex flex-col gap-3 items-center justify-center">
          <div className="flex w-full justify-between">
            <label>Student Id</label>
            <input 
              className="w-[60%] border-2 border-[#68707D40]"
              name="id"
              value={data.id}
              onChange={handleChange}
            />
          </div>
          <div className="flex w-full justify-between">
            <label>Student Name</label>
            <input 
              className="w-[60%] border-2 border-[#68707D40]"
              name="name"
              value={data.name}
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