import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { 
    SET_ERROR,
    SET_WALLET, 
    RESET_WALLET, 
    SET_LOADING, 
    SET_RECORDS, 
} from "./action";
import logic from "../interface/logic";


const context = React.createContext();

export const initialStates = {
    error: false,
    errorMessage: undefined,
    wallet: undefined,
    loading: false,
    records: [],
}

export const ContextProvider = ({children})=>{
    const [states, dispatch] = useReducer(reducer, initialStates);
    
    const resetError = () => {
        dispatch({
            type: SET_ERROR,
            payload: {error: false}
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

    const isSet = (name, value)=>{
        if(value==undefined || value===""){
            setError(`${name} is not defined.`);
            return false;
        } 
        return true;
    }
    const setWallet = (wallet, addToLocalStorage=false)=>{
        // console.log(wallet);
        // if(addToLocalStorage) 
        //     localStorage.setItem("wallet", JSON.stringify(wallet));

        dispatch({
            type: SET_WALLET,
            payload: {wallet,}
        })
        // Wallet to store in local storage ???
    };
    const resetWallet = ()=>{
        // localStorage.removeItem("wallet");
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
            console.log("Result = ", res);
            setRecords(res);
            resetLoading();
            return res;
        } catch(err) {
            console.log(err);
            setError(err.message || err);
            resetLoading();
            return null;
        }
    }

    const addStudent = async (studentName, studentId)=>{ // Adding student
        setLoading();
        if(!isSet("student name", studentName) || !isSet("student-id", studentId)) {
            return null;
        }
        try {
            if(!states.wallet) throw new Error("Not Login!");
            const res = await logic.addRecord(states.wallet, studentName, studentId);
            resetLoading();
            return res;
        } catch(err) {  
            setError(err.message || err);
            resetLoading();
        }
    }

    const addCourse = async(recordId, courseName, grade)=>{
        if(!isSet("grade", grade) || !isSet("course-name", courseName) || !isSet("record-id", recordId)) 
            return;
        setLoading();
        try {
            const res = await logic.addCourse(states.wallet,recordId, courseName, grade);
            console.log(res);
            resetLoading();
            return res;
        } catch(err) {
            console.log(err)
            setError(err.message || err);
            resetLoading();
            return null;
        }
    }

    useEffect(()=>{
        getRecords().then((res) =>{
            dispatch({
                type:SET_RECORDS,
                payload:{
                    records:res
                }
            })
        }).catch((err)=>console.log(err))
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
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(context)
}