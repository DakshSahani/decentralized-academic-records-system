import {useMemo, useState} from "react"
import {Input} from "antd"

export default function SearchFilter({classNames, searchFunc, label, ...rest}){
    const [text, setText] = useState("")

    const debounce = ()=>{
        let timeOutId;
        return (e)=>{
            setText(e.target.value);
            clearTimeout(timeOutId);
            timeOutId = setTimeout(()=>{
                searchFunc(e.target.value);
            }, 900);
        }
    }
    const optimizedDebounce = useMemo(()=>debounce(), []);

    return <div className={`flex justify-between gap-4 ${classNames}`}>
        <label className="whitespace-nowrap min-w-40 text-xl">{label}</label>
        <Input
            style={{ border: "1px solid black" }}
            onChange={optimizedDebounce}
        />
    </div>
}