import { useState } from "react"
// import { useParams } from "react-router-dom";

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    studentId: 0,
    studentName: "",
  });
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  return (
    <div className="w-full h-full flex items-center justify-around">
        <form className="border border-gray-600 rounded-3xl p-8 py-10 flex flex-col gap-8">
            
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-2xl ">Add a Studnet</p>
            </div>

            <div className="flex gap-8">
                <label htmlFor="courseName" className="min-w-[9vw] text-lg">Student Id:</label>
                <input 
                    className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
                    type="number" 
                    name="studentId" 
                    value={formData.studentId} 
                    onChange={handleChange} 
                />
            </div>
            <div className="flex gap-8">
                <label htmlFor="grade" className="min-w-[9vw] text-lg">Student Name: </label>
                <input 
                    className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none" 
                    type="text" 
                    name="studentName" 
                    value={formData.studentName} 
                    onChange={handleChange} 
                />
            </div>
            <button 
                type="submit" 
                onClick={()=>{}}
                className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
            >
                Add+
            </button>
        </form>
        
        <img src="/enter-grade.svg" alt="Enter Grade" className="w-[30vw]"/>
    </div>
  )
}