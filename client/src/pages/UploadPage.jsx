import { useEffect, useState } from "react"
import { ListComponent, LoadingWrapper, SearchFilter } from "../components"
import { useAppContext } from "../context/Context"
import { Link } from "react-router-dom";

export default function UploadPage() {
  let { records } = useAppContext();
  const [localRecords, setLocalRecords] = useState(records)
  
  useEffect(()=>{
    setLocalRecords(records);
  },[records]);

  const search = (value)=>{
    const reName = new RegExp(value.studentName, 'i')
    const reId = new RegExp(value.studentId, 'i')
    const temp = records.filter(el=>( reName.test(el.studentName) && reId.test(el.studentId.toString()) ))
    setLocalRecords(temp)
  }
  
  return (
    <LoadingWrapper>
      <div className="w-full flex flex-col justify-between px-[2rem] relative">    
          <div className="flex justify-between items-start">
    
            <div className="hidden h-full md:block sticky left-0 top-[22vh] flex flex-col gap-16 border rounded-3xl border-black p-10">
              <img className="md:w-[20vw] lg:w-[25vw] mb-16" src="/select-student.svg" alt="Add Student" />
              <Link to="/records/add" className="w-full bg-primary p-2 px-2.5 rounded-lg text-white text-center hover:scale-[1.04]">
                Add student +
              </Link>
            </div>
    
            <div className="flex flex-col gap-2 basis-[60%]">
              <div className="w-full p-2 flex justify-between items-center gap-2 bg-primary border-primary rounded-xl text-white ">
                <img src="/search.svg" className="w-8 h-8 mr-2 bg-primary rounded-l-xl" alt="search" />
                <form className="w-full p-1">
                  <SearchFilter 
                    classNames="w-full"
                    searchFunc={search} 
                    labels={["Student Name", "Student ID"]}
                    names={["studentName", "studentId"]}
                  />
                </form>
              </div>
    
              <ul className="mt-4">
                {
                  localRecords?.map((student, indx)=>
                    <ListComponent 
                      heading={student.studentName}
                      id={student.studentId}
                      key={indx} 
                      onClick={()=>{}}
                      to={`/records/${student.studentId}`}
                    />
                  )
                }
              </ul>
            </div>
              
          </div>
      </div>
    </LoadingWrapper>
  );
}