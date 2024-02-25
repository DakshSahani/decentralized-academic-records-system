import { useState } from 'react'
import { useAppContext } from '../../context/Context';
import { Loader } from '../../components';

export default function AddCourseForm({student, showAddCourseForm, setShowAddCourseForm}) {
  const { addCourse, loading } = useAppContext();

  const [formData, setFormData] = useState({
    courseName: "",
    grade: 0,
  });
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await addCourse(student.recordId, formData.courseName, formData.grade)
    setFormData({
        courseName:"",
        grade:0
    })
  }
  return (
    <form className={`${showAddCourseForm ? "block" : "hidden"} w-[80vw] sm:w-fit border border-gray-600 rounded-3xl p-6 py-8 flex flex-col gap-6 relative`}>
      <h2 className="w-full !text-lg sm:!text-2xl text-center text-primary">Add New Course</h2>

      <div className="flex gap-8">
        <label htmlFor="courseName" className="sm:min-w-[9vw] text-sm md:text-lg">Course Name:</label>
        <input 
          className="overflow-hidden text-black px-2 py-1.5 border border-gray-500 rounded outline-none"
          type="text" 
          name="courseName" 
          value={formData.courseName} 
          onChange={handleChange} 
        />
      </div>

      <div className="w-full flex gap-8">
        <label htmlFor="grade" className="sm:min-w-[9vw] text-sm md:text-lg">Grade: </label>
        <input 
          className="w-full text-black px-2 py-1.5 border border-gray-500 rounded outline-none sm:min-w-40" 
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
          cursor:(loading?"not-allowed":"pointer")
        }}
      >
        {
          loading ?
          <Loader loading={loading} color="white" size="1rem"/>
          :
          "Submit"
        }
      </button>

      <button
        className='absolute top-1 right-1'
        onClick={(e)=>{
          e.preventDefault();
          setShowAddCourseForm(false)
        }}
      >
        <img src='/cross.svg' alt='cross' className='w-8 h-8'/>
      </button>
    </form>   
  );
}
