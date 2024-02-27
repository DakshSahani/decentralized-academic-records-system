import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { 
    SET_ERROR,
    SET_WALLET, 
    RESET_WALLET, 
    SET_LOADING, 
    SET_RECORDS, 
    SET_ADMIN, 
} from "./action";
import toast from "react-hot-toast";
import logic from "../interface/logic";


const context = React.createContext();

export const initialStates = {
    error: false,
    errorMessage: undefined,
    wallet: undefined,
    loading: false,
    records: undefined,
    admin: false, 
}

export const ContextProvider = ({children})=>{
    const [states, dispatch] = useReducer(reducer, initialStates);
    
    const resetError = () => {
        dispatch({
            type: SET_ERROR,
            payload: {error: false, message: states.errorMessage}
        })
    }
    const setError = (message) => {
        if(!message) message = "Something went wrong";

        setTimeout(()=>resetError(), 3000);

        dispatch({
            type: SET_ERROR,
            payload: { 
                error: true, 
                message, 
            }
        });
    }

    const isSet = (value)=>{
        if(value===undefined || value===""){
            return false;
        } 
        return true;
    }
    
    const setWallet = (wallet)=>{
        dispatch({
            type: SET_WALLET,
            payload: {wallet,}
        })
    };
    const resetWallet = ()=>{
        dispatch({
            type: RESET_WALLET,
        })
    }

    const setLoading = ()=>{
        dispatch({
            type: SET_LOADING, 
            payload: {loading: true}
        });
    }
    const resetLoading = ()=> {
        dispatch({
            type: SET_LOADING,
            payload: {loading: false},
        });
    }

    const setRecords = (records)=>{
        dispatch({
            type: SET_RECORDS,
            payload: {records,}
        })
    }


    const getRecords = async ()=>{
        setLoading();
        try {
            const res = await logic.getRecords();
            setRecords(res);
            resetLoading();
            return res;
        } catch(err) {
            setError(err.message || err);
            resetLoading();
            return null;
        }
    }

    const addStudent = async (studentName, studentId)=>{ // Adding student
        setLoading();
        try {
            if(!isSet( states.wallet))
                throw new Error("Account is not set");
            if(!isSet(studentName) || !isSet(studentId)) {
                throw new Error("student-id or student name is missing")
            }
            if(!states.wallet) throw new Error("Not Login!");
            const res = await logic.addRecord(states.wallet, studentName, studentId);
            await getRecords()
            resetLoading();
            
            toast.success("Student Added Successfully!");
            return res;
        } catch(err) {  
            setError(err.message || err);
            resetLoading();
            return null
        }
    }

    const addCourse = async(recordId, courseName, grade)=>{
        setLoading();
        try {
            if(!isSet(states.records)) throw new Error("Something went wrong!")
            if(!isSet(states.wallet))
                throw new Error("Account not found");
            if(!isSet(grade) || !isSet(courseName) || !isSet(recordId))
                throw new Error("Course name or grade is not valid");
            if(recordId>=states.records.length)
                throw new Error("Invalid student is selected");
            for(let key of states.records[recordId]?.courses.keys()){
                if(key.toLowerCase() === courseName.toLowerCase())
                    throw new Error(`${courseName} course already exits in records`);
            }
            const res = await logic.addCourse(states.wallet,recordId, courseName, grade);
            await getRecords()
            resetLoading();
            return res;
        } catch(err) {
            setError(err.message || err);
            resetLoading();
            return null;
        }
    }

    const setAdmin = async (wallet)=>{
        setLoading();
        let res;
        try {
            if(!isSet(wallet)) throw new Error("Connect using your mnemonic!");

            res = await logic.isAdmin(wallet);
            dispatch({
                type: SET_ADMIN,
                payload: {admin: res}, 
            })
        } catch(err) {
            setError(err.message || err);
            res = false;
        }
        resetLoading()
        return res;
    }

    useEffect(()=>{
        getRecords()
        .then((res) =>{
            dispatch({
                type:SET_RECORDS,
                payload:{
                    records: res
                }
            })
        })
        .catch(err=>setError(err.message));

    // eslint-disable-next-line
    }, [states.wallet]);

    return (
        <context.Provider
            value={{
                ...states,
                setError,
                resetError,
                setWallet,
                resetWallet, 
                setLoading,
                resetLoading,
                getRecords,
                addStudent, 
                addCourse, 
                setAdmin, 
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(context)
}