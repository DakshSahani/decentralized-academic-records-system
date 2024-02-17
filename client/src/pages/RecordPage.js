import { useParams } from "react-router-dom";


export default function RecordPage(){
  const { studentId } = useParams();

  // Temporary record
  const record = {
    recordId:123,
    studentId:2,
    studentName:"Aakash Sharma",
    courses:{
      "Mathematics I":80,
      "Analysis of Algorithms":90,
      "Computer Networks":98,
      "Operating System":88
    }
  }

  return ( 
    <div>
      <div>
        <h1>{record.studentId}</h1>
        <h1>{record.studentName}</h1>
      </div>
      <div>
        {
          Object.keys(record.courses).map(course => (
            <div className="">
              <h1 className="inline">{course}</h1>
              <h1 className="">{record.courses[course]}</h1>
            </div>
          ))
        }
      </div>
    </div>
  );
}