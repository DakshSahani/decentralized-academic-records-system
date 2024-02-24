import { useParams } from "react-router-dom";
import {useAppContext} from "../context/Context"
import NotFoundPage from "./NotFoundPage";
import {Loader} from "../components"


export default function CoursesPage(){
  const { studentId } = useParams();
  const {records, loading} = useAppContext()

  if(loading){
    return <div className="w-[80%] text-center">
      <Loader loading={loading} size={"2rem"} color="black"/>
    </div>
  }
  if(records.length === 0){
    return <NotFoundPage />
  }

  const record = records?.find(el=>el.studentId===studentId*1)
  
  const getCourses = ()=>{
    const res = []
    let i = 0
    for(let key of record?.courses.keys()){
      res.push(
      <tr key={key} className="odd:bg-white even:bg-gray-200 border-b">
        <td className="px-6 py-4">{++i}</td>
        <td className="px-6 py-4">{key}</td>
        <td className="px-6 py-4">{record.courses.get(key)}</td>
      </tr>)
    }
    return res
  }

  return ( 
    <>
      <div className="w-full mb-8">
        <h3><span className="text-primary">Student Id : </span>{record.studentId}</h3>
        <h3><span className="text-primary">Student Name: </span>{record.studentName}</h3>
      </div>
      <div className="w-full relative overflow-x-auto border-2 border-gray-200 sm:rounded-lg">
        <table className="w-full text-md text-left rtl:text-right text-gray-500">
          <thead className="text-md text-gray-700 uppercase bg-gray-200">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      S.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Courses
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Grades
                  </th>
              </tr>
          </thead>
          <tbody>
              {
                getCourses()
              }
          </tbody>
        </table>
      </div>
    </>
  );
}