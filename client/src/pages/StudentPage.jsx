import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {useAppContext} from "../context/Context"
import { Loader } from "../components";
import CourseTable from "./CoursesTable"
import NotFoundPage from "./NotFoundPage";
import AddCourseForm from "./AddCourseForm";

export default function StudentPage() {
  const { studentId: id } = useParams();
  const { records, loading } = useAppContext()

  const [student ,setStudent] = useState({});
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);

  useEffect(()=>{
      setStudent(records.find((s)=>s.studentId === id*1))
      // eslint-disable-next-line
  },[records])

  if(loading) return <Loader loading={loading} color="black" size="2rem"/>
  if(!student) return <NotFoundPage />

  return (
    <div className="w-full px-[2rem] flex flex-justify-between gap-4 md:gap-8">
        {
            showAddCourseForm &&
            <AddCourseForm student={student}/>
        }

        <div className="w-full p-8 mb-4 flex flex-col items-center bg-gray-50 shadow-md">
            <CourseTable />
            <button 
                className="bg-primary text-white rounded-lg p-2 mt-8"
                onClick={()=>setShowAddCourseForm(!showAddCourseForm)}
            > 
                Add Course
            </button>
        </div>
    </div>
  )
}
        {/* <div>
            <h2 className="">Add New Course</h2>
            {wallet?
            <form className="border border-gray-600 rounded-3xl p-8 py-10 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between">
                    <p className="text-2xl ">{student?.studentName}</p>
                    <p className="text-[#1D4ED8]">{student?.studentId}</p>
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
                        className="text-black px-2 py-1.5 border border-gray-500 rounded outline-none min-w-40" 
                        type="number" 
                        name="grade" 
                        min="0"
                        max="100"
                        value={formData.grade} 
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    onClick={handleSubmit}
                    className="p-2 bg-[#1D4ED8] rounded text-white text-semibold text-lg"
                    disabled={loading}
                    style={{
                        opacity:(loading?0.5:1),
                        cursor:(loading?"not-allowed":"pointer")}}
                >
                    {loading?
                    <Loader loading={loading} color="white" size="1rem"/>
                    :
                    "Submit"}
                </button>
            </form>
            :
            <div className="border border-gray-600 rounded-3xl p-8">
                <h2 className="my-2">Login to add</h2>
                <img src="/please-login.svg" alt="Please Login" className="w-[75vw] sm:w-[45vw] md:w-[35vw]"/>
            </div>
            }
        </div> */}