import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import {useAppContext} from "../../context/Context"
import { LoadingWrapper } from "../../components";
import AddCourseForm from "./AddCourseForm";
import CourseTable from "./CoursesTable";
import { NotFoundPage, ProtectedPage } from "../";
import { motion } from "framer-motion";

export default function StudentPage() {
  const { studentId: id } = useParams();
  const { records, wallet, admin } = useAppContext()
  
  const [student ,setStudent] = useState({});
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  
  useEffect(()=>{
      setStudent(records?.find((s)=>s.studentId === id*1))
      // eslint-disable-next-line
  },[records]);
  
  useEffect(()=>{
    if(!wallet || !admin) setShowAddCourseForm(false);
    // eslint-disable-next-line
  }, [wallet]);

  if(!student) return <NotFoundPage />

  const variants = {
    invisible: {width: "0vw", height: "0px", opacity: 0},
    visible: {width: "30vw", height: "100%", opacity: 1},
  }
  return (
    <LoadingWrapper condition={records === undefined}>
    <ProtectedPage condition={!showAddCourseForm || wallet} adminCondition={!showAddCourseForm || admin}>
        <div className={`w-full px-4 sm:px-8 flex flex-col-reverse lg:flex-row items-center lg:justify-between ${showAddCourseForm && admin? "lg:gap-24": ""}`}>
            <motion.div
                className={`${showAddCourseForm && admin ? "!flex" : "hidden"} add-course-form py-4 lg:p-4 flex items-center justify-center lg:justify-start`}
                variants={variants}
                initial="invisible"
                animate={ showAddCourseForm && admin ? "visible" : "invisible" }
            >
                <AddCourseForm student={student} showAddCourseForm={showAddCourseForm} setShowAddCourseForm={setShowAddCourseForm} />
            </motion.div>

            <div className="w-full py-2 sm:p-8 mb-4 flex flex-col items-center bg-gray-50 shadow-md">
                <CourseTable />
                    {
                        !showAddCourseForm && admin &&
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
    </LoadingWrapper>
  );
}