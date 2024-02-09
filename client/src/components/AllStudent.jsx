import ListComponent from "./ListComponent"

export default function AllStudent() {
  return (
    <div className="w-full flex flex-col items-center">
        <h2 className="m-0 text-[#]">SELECT STUDENT</h2>
        <ul>
            {
                students.map((student, indx)=>
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