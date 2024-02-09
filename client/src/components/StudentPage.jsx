import { useState } from "react"
import { useParams } from "react-router-dom";

export default function StudentPage() {
  const { studentId: id } = useParams();
  const filtered = students.filter((s)=>s.studentId == id);
  const name = filtered?.length > 0 ? filtered[0].studentName : "Name not found";

  const [formData, setFormData] = useState({
    courseName: "",
    grade: 0,
  });
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  return (
    <div className="w-full h-full flex items-center justify-around">
        <form className="border border-gray-600 rounded-3xl p-8 py-10 flex flex-col gap-8">
            
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-2xl ">{name}</p>
                <p className="text-[#1D4ED8]">{id}</p>
            </div>

            <div className="flex gap-8">
                <label htmlFor="courseName" className="min-w-[9vw] text-lg">Course Name:</label>
                <input 
                    className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
                    type="text" 
                    name="courseName" 
                    value={formData.courseName} 
                    onChange={handleChange} 
                />
            </div>
            <div className="flex gap-8">
                <label htmlFor="grade" className="min-w-[9vw] text-lg">Grade: </label>
                <input 
                    className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none" 
                    type="number" 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleChange} 
                />
            </div>
            <button 
                type="submit" 
                onClick={()=>{}}
                className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
            >
                Submit
            </button>
        </form>
        
        <img src="/enter-grade.svg" alt="Enter Grade" className="w-[30vw]"/>
    </div>
  )
}



const students = [
    {
        studentId: 12334,
        studentName: "Abhay Sharama",
        
    }, {
        studentId: 53334,
        studentName: "Divijay Patidar",
    }, {
        studentId: 12332,
        studentName: "Geeta Joshi",
    },  {
        studentId: 43334,
        studentName: "Abhay Sharama",
    },  {
        studentId: 12634,
        studentName: "Mohini Sharama",
    },  {
        studentId: 22334,
        studentName: "Anuj Sharama",
    }
]