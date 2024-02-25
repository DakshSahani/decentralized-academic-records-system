import {useMemo, useState} from "react"
import {Input} from "antd"

export default function SearchFilter({
    classNames, 
    searchFunc, 
    labels, 
    names, 
    inputClassNames,
    ...rest
}){
  
  const initialState = {}
  for(let name of names){
      initialState[name] = ""
  }

  const [state, setState] = useState(initialState)  
  const debounce = ()=>{
    let timeOutId;
    return (e)=>{
      let previousState;
      setState(prev =>{
        previousState = prev
        return {
          ...prev,
          [e.target.name]:e.target.value
        }
      });

      clearTimeout(timeOutId);
      timeOutId = setTimeout(()=>{
        // console.log(state)
        searchFunc({
          ...previousState,
          [e.target.name]:e.target.value
        });
      }, 900);
    }
  }

  const optimizedDebounce = useMemo(()=>debounce()
  // eslint-disable-next-line
  , []);

  return (
    <div className={`flex justify-center items-center gap-2 md:gap-4 ${classNames}`}>
      {
        names.map((el, ind)=>
          <Input
            className={`text-sm sm:text-base border border-black rounded-xl min-w-40 sm:min-w-52 ${inputClassNames}`}
            onChange={optimizedDebounce}
            name={el}
            value={state[el]}
            placeholder={labels[ind]}
            key={ind}
          />
        )
      }
    </div>
  );
}