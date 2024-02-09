import { useState } from "react";

export default function ViewPage() {
  const [data, setData] = useState({
    id: "",
    name: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }
  const handleChange = (e) => {
    const prop = e.target.name
    setData(prev => ({
      ...prev,
      prop:e.target.value
    }))
  }

  return (
    <div className="flex flex-col pt-4 items-center">
      {/* Input form */}
      <h4>Please Enter the student details</h4>
      <form onSubmit={handleSubmit} className="pt-10 flex flex-col gap-3 sm:w-[50%] md:w-[35%] lg:w-[40%]">
        <div className="flex w-full justify-between text-xl">
          <label>Student Id</label>
          <input 
            className="border-2 border-[#68707D40]"
            name="id"
            onChange={handleChange}
          />
        </div>
        <div className="flex w-full justify-between text-xl">
          <label>Student Name</label>
          <input 
            className="border-2 border-[#68707D40]"
            name="name"
            onChange={handleChange}
          />
        </div>

        <button
          className="connect-button mt-8"
          type="submit"
          onClick={handleSubmit}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}