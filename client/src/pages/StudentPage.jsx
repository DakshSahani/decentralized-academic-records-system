import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {useAppContext} from "../context/Context"
import { Loader } from "../components";
import CourseTable from "./CoursesTable"
import NotFoundPage from "./NotFoundPage";
import AddCourseForm from "./AddCourseForm";
import { motion } from "framer-motion";
import ProtectedPage from "./ProtectedPage";

export default function StudentPage() {
  const { studentId: id } = useParams();
  const { records, loading, wallet } = useAppContext()
  
  const [student ,setStudent] = useState({});
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  
  useEffect(()=>{
      setStudent(records?.find((s)=>s.studentId === id*1))
      // eslint-disable-next-line
  },[records])
    
  if(!records) return <div>Something Went Wrong</div>;
  if(loading || records === undefined) return <Loader loading={loading} color="black" size="2rem"/>
  if(!student) return <NotFoundPage />

  const variants = {
    invisible: {width: "0vw", height: "0px", opacity: 0},
    visible: {width: "30vw", height: "100%", opacity: 1},
  }
  return (
    <ProtectedPage condition={!showAddCourseForm || wallet}>
    <div className={`w-full px-[2rem] flex flex-col-reverse lg:flex-row items-center lg:justify-between ${showAddCourseForm ? "lg:gap-24": ""}`}>
        <motion.div
            className={`${showAddCourseForm ? "block" : "hidden"} p-4 flex items-center justify-center lg:justify-start`}
            variants={variants}
            initial="invisible"
            animate={ showAddCourseForm ? "visible" : "invisible" }
        >
            <AddCourseForm student={student} setShowAddCourseForm={setShowAddCourseForm} />
        </motion.div>

        <div className="w-full p-8 mb-4 flex flex-col items-center bg-gray-50 shadow-md">
            <CourseTable />
                {
                    !showAddCourseForm && 
                    <button 
                        className="bg-primary text-white rounded-lg p-2 mt-8"
                        onClick={()=>setShowAddCourseForm(!showAddCourseForm)}
                    > 
                        Add Course
                    </button>
                }
        </div>
    </div>
    </ProtectedPage>
  );
}