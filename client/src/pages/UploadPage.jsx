import { useEffect, useState } from "react"
import { ListComponent, Loader } from "../components"
import { useAppContext } from "../context/Context"
import { FilterByNameAndId } from "../components"
import { Link } from "react-router-dom";

export default function UploadPage() {
  let {loading, records} = useAppContext();
  const [localRecords, setLocalRecords] = useState(records)
  
  useEffect(()=>{
    setLocalRecords(records);
  },[records]);
  
  return (
    <div className="w-full flex flex-col justify-between px-[2rem] relative">
      {
        loading
        ?
        <div className="w-[80%] mt-8 w-full flex justify-center items-center">
          <Loader loading={loading} size={"2rem"} color="black"/>
        </div>
        :        
        <div className="flex justify-between items-start">

          <div className="hidden md:block">
            <div className="left-2 top-20 flex flex-col gap-16">
              <Link to="/upload/add" className="bg-primary p-2 px-2.5 rounded-lg text-white text-center">
                Add student +
              </Link>
              <img className="md:w-[30vw] lg:w-[35vw] " src="/select-student.svg" alt="Add Student" />
            </div>
          </div>

          <div className="flex flex-col gap-4 basis-1/2">
            <div className="w-full p-2 flex justify-between items-center gap-2 bg-primary border-primary rounded-xl text-white ">
              <img src="/Search.svg" className="w-12 h-12 bg-primary rounded-l-xl" alt="search" />
              <FilterByNameAndId setLocalRecords={setLocalRecords} className="basis-[80%]" />
            </div>

            <ul className="mt-4">
                {
                  localRecords?.map((student, indx)=>
                    <ListComponent 
                      heading={student.studentName}
                      id={student.studentId}
                      key={indx} 
                      onClick={()=>{}}
                      to={`/upload/${student.studentId}`}
                    />
                  )
                }
            </ul>
          </div>
        </div>
      }
    </div>
  )
}