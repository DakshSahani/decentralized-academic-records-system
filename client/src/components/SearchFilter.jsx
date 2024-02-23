import {useMemo, useState} from "react"
import {Input} from "antd"

export default function SearchFilter({classNames, searchFunc, labels, names, ...rest}){
    const initialState = {}
    for(let name of names){
        initialState[name] = ""
    }
    const [state, setState] = useState(initialState)

    const debounce = ()=>{
        let timeOutId;
        return (e)=>{
            setState(prev =>{
                return {
                    ...prev,
                    [e.target.name]:e.target.value
                }
            });
            clearTimeout(timeOutId);
            timeOutId = setTimeout(()=>{
                searchFunc({
                    ...state,
                    [e.target.name]:e.target.value
                });
            }, 900);
        }
    }
    const optimizedDebounce = useMemo(()=>debounce(), []);

    return <div className={`flex justify-between gap-2 md:gap-4 ${classNames}`}>
        {
            names.map((el, ind)=>
            <div key={ind}>
                <label className="whitespace-nowrap min-w-28 md:min-w-40 text-md md:text-xl">{labels[ind]}</label>
                <Input
                    style={{ border: "1px solid black" }}
                    onChange={optimizedDebounce}
                    name={el}
                    value={state[el]}
                />
            </div>)
        }
    </div>
}