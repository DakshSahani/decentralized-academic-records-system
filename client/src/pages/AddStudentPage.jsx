import { useState } from "react"
import { useAppContext } from "../context/Context";
import { Loader } from "../components";
import { Link } from "react-router-dom";

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    studentId: 0,
    studentName: "",
  });
  const [previousStudent, setPreviousStudent] = useState(undefined);

  const {addStudent, loading} = useAppContext()
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    
    addStudent(formData.studentName, formData.studentId).then((res)=>{
      if(res != null){
        setPreviousStudent({name: formData.studentName, id: formData.studentId});
      }
    })

    setFormData({
        studentId:0,
        studentName:""
    })
  }

  return (
    <div className="w-full h-full flex items-center justify-around">
        <form className="border border-gray-600 rounded-3xl p-2 py-4 md:p-8 md:py-10 flex flex-col gap-4 md:gap-8" onSubmit={handleSubmit}>
            
            <div className="flex flex-col md:flex-row justify-between">
                <p className="text-lg md:text-2xl ">Add a Studnet</p>
            </div>

            <div className="flex gap-8">
                <label htmlFor="courseName" className="min-w-[9vw] text-md md:text-lg">Student Id:</label>
                <input 
                    className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
                    type="number" 
                    name="studentId" 
                    value={formData.studentId} 
                    onChange={handleChange} 
                />
            </div>
            <div className="flex gap-8">
                <label htmlFor="grade" className="min-w-[9vw] text-md md:text-lg">Student Name: </label>
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
                disabled={loading}
                className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
                style={{opacity:(loading?0.5:1)}}
            >   
            {
                loading?
                <Loader loading={loading} size="1rem" color={"white"} />:
                "Add+"
            }
            </button>
            {
              previousStudent !== undefined &&
              <Link to={`/records/${previousStudent.id}`} className="text-[#1D4ED8]">
                {`Click here to add courses attended by ${previousStudent.name}`}
              </Link>
              
            }
        </form>
        
        <img src="/enter-grade.svg" alt="Enter Grade" className="w-[30vw] hidden md:block"/>
    </div>
  )
}