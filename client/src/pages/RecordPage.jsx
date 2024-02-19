import { useParams } from "react-router-dom";
import {useAppContext} from "../context/Context"


export default function RecordPage(){
  const { studentId } = useParams();
  const records = useAppContext().records
  if(!records){
    return <h1>NOT Found</h1>
  }
  const record = records.find(el=>el.studentId===studentId*1)

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
                Object.keys(record.courses).map((course, ind) => (
                  <tr key={ind} className="odd:bg-white even:bg-gray-50 border-b">
                    <td className="px-6 py-4">{ind+1}</td>
                    <td className="px-6 py-4">{course}</td>
                    <td className="px-6 py-4">{record.courses[course]}</td>
                </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    </div>
  );
}