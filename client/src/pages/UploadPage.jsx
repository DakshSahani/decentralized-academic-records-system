import { useEffect, useState } from "react"
import {ListComponent, Loader} from "../components"
import { useAppContext } from "../context/Context"
import SearchFilter from "../components/SearchFilter"

export default function UploadPage() {
  let {loading, records} = useAppContext()
  const [localRecords, setLocalRecords] = useState(records)
  
  useEffect(()=>{
    setLocalRecords(records);
    console.log("records", records)
  },[records]);

  const searchByName = (name)=>{
    const re = new RegExp(name, 'i')
    const temp = records.filter(el=> re.test(el.studentName))
    setLocalRecords(temp)
  }
  const searchById = (id)=>{
    const re = new RegExp(id, 'i')
    const temp = records.filter(el=> re.test(el.studentId.toString()))
    setLocalRecords(temp)
  }
  
  return (
    <div className="w-[98%] flex justify-between px-[30px] relative">
        <div>
            <div className="pt-[2vh] sticky left-2 top-32 flex flex-col gap-16">
                <h3 className="m-0 ">Select Student</h3>
                <img className="md:w-[30vw] lg:w-[35vw] " src="/select-student.svg" alt="select student" />
            </div>
        </div>
        {loading?
          <div className="mt-8 w-full flex justify-center items-center">
            <Loader loading={loading} size={"2rem"} color="black"/>
          </div>
          :
          <div className="w-[55%] flex flex-col items-center">
            <form className="w-full">
              <SearchFilter classNames="w-full mb-2" searchFunc={searchByName} label="Student Name"/>
              <SearchFilter classNames="w-full" searchFunc={searchById} label="Student Id"/>
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
                      key={student.studentId} 
                      onClick={()=>{}}
                      to={`/upload/${student.studentId}`}
                    />
                  )
                }
            </ul>
        </div>
        }
    </div>
  )
}