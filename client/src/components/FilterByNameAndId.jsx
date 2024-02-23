import { useMemo,  useState } from "react";
import { useAppContext } from "../context/Context";
import {Input} from "antd"

export default function FilterByNameAndId({setLocalRecords, className}) {
  let { records } = useAppContext();
  const [state, setState] = useState({
    name: "",
    id: "",
  });

  const filter = (data)=>{
    const reName = new RegExp(data.name, 'i')
    const reId = new RegExp(data.id, 'i')
    const temp = records.filter((el) =>
        reName.test(el.studentName) && reId.test(el.studentId)
    );
    setLocalRecords(temp)
  };

  const debounce = ()=>{
    let timeOutId;
    return (e)=>{
      setState((prev)=>{
        const newState = {
          ...prev, [e.target.name]: e.target.value,
        }
        clearTimeout(timeOutId);
        timeOutId = setTimeout(()=>{
          filter(newState);
        }, 900);
        return newState;
      })
    }
  }
  const optimizedDebounce = useMemo(()=>
      debounce(), 
  // eslint-disable-next-line
  []);
  

  return (
    <form className={`w-full flex flex-col justify-between items-center gap-1 md:gap-2 ${className ? className:""}`}>
      <div className="flex justify-between items-center gap-2 w-full">
        <Input
            className="border border-black rounded-lg p-1"
            onChange={optimizedDebounce}
            name="name"
            value={state.name}
            placeholder="student-name"
        />
      </div>

      <div className="flex justify-between items-center gap-2 w-full">
        <Input
            className="border border-black rounded-lg p-1"
            onChange={optimizedDebounce}
            name="id"
            value={state.id}
            placeholder="student-id"
        />
      </div>
    </form>
  );
}
