import { useParams } from "react-router-dom";
import {useAppContext} from "../context/Context"


export default function RecordPage(){
  const { studentId } = useParams();
  const {records, loading} = useAppContext()
  if(loading){
    return <h1>Loading...</h1>
  }
  if(records.length == 0){
    return <h1>NOT Found</h1>
  }
  const record = records?.find(el=>el.studentId===studentId*1)
  console.log("courses", record?.courses)
  const getCourses = ()=>{
    const res = []
    let i = 0
    for(let key of record?.courses.keys()){
      res.push(
      <tr key={key} className="odd:bg-white even:bg-gray-50 border-b">
        <td className="px-6 py-4">{++i}</td>
        <td className="px-6 py-4">{key}</td>
        <td className="px-6 py-4">{record.courses.get(key)}</td>
      </tr>)
    }
    return res
  }

  return ( 
    <div className="w-[90%]">
      <div className="mb-4">
        <h2>Student Id : {record.studentId}</h2>
        <h2>Student Name: {record.studentName}</h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
    </div>
  );
}