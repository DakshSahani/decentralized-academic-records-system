import ListComponent from "./ListComponent"
import { useAppContext } from "../context/Context"

export default function AllStudent() {
  const {loading, records} = useAppContext()

  return (
    <div className="w-[98%] flex justify-between px-[30px] relative">
        <div>
            <div className="pt-[2vh] sticky left-2 top-32 flex flex-col gap-16">
                <h3 className="m-0 ">Select Student</h3>
                <img className="md:w-[30vw] lg:w-[35vw] " src="/select-student.svg" alt="select student" />
            </div>
        </div>
        {loading?<h1>Loading...</h1>:
        <div className="w-[55%] flex flex-col items-center">
            <ul className="w-full">
                <ListComponent
                    heading="Add student +"
                    to={'/upload/add'}
                    add
                />
                {
                    records?.map((student, indx)=>
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
        </div>}
    </div>
  )
}

const students = [
    {
        studentId: 12334,
        studentName: "Abhay Sharama",
        
    }, {
        studentId: 53334,
        studentName: "Divijay Patidar",
    }, {
        studentId: 12332,
        studentName: "Geeta Joshi",
    },  {
        studentId: 43334,
        studentName: "Abhay Sharama",
    },  {
        studentId: 12634,
        studentName: "Mohini Sharama",
    },  {
        studentId: 22334,
        studentName: "Anuj Sharama",
    }
]