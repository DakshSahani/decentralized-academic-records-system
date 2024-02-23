import { useEffect, useState } from "react"
import { ListComponent, Loader, SearchFilter } from "../components"
import { useAppContext } from "../context/Context"
import { Link } from "react-router-dom";

export default function UploadPage() {
  let {loading, records} = useAppContext();
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
          :
          <div className="md:w-[55%] flex flex-col items-center">
            <form className="w-full">
              <SearchFilter 
                classNames="w-full mb-2"
                searchFunc={search} 
                labels={["Student Name", "studentId"]}
                names={["studentName", "studentId"]}
              />
            </form>
            <ul className="w-full mt-4">
                <ListComponent
                  heading="Add student +"
                  to={'/upload/add'}
                  add
                />
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