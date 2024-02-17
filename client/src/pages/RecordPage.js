

export default function RecordPage(record){
    if(!record){
        record = {
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
    }
    return <div>
        <div>
            <h1>{record.studentId}</h1>
            <h1>{record.studentName}</h1>
        </div>
        <div>
            {
                Object.keys(record.courses).map(course=>(
                    <div>
                        <h1>{course}</h1>
                        <h1>{record.courses[course]}</h1>
                    </div>
                ))
            }
        </div>
    </div>
}