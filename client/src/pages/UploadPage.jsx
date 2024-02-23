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

          {/* <div className=""> */}
            <div className="hidden h-full md:block sticky left-0 top-[20vh] flex flex-col gap-16 border rounded-3xl border-black p-10">
              <img className="md:w-[20vw] lg:w-[25vw] mb-16" src="/select-student.svg" alt="Add Student" />
              <Link to="/upload/add" className="w-full bg-primary p-2 px-2.5 rounded-lg text-white text-center">
                Add student +
              </Link>
            </div>
          {/* </div> */}

          <div className="flex flex-col gap-4 basis-[60%]">
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