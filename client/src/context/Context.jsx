import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import { 
    SET_ERROR,
    SET_WALLET, 
    SET_LOADING, 
    SET_RECORDS, 
} from "./action";
import logic from "../interface/logic";


const context = React.createContext();

export const initialStates = {
    error: false,
    errorMessage: undefined,
    wallet: {},
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

    const isSet = ({name, value})=>{
        if(!value || value===""){
            setError(`${name} is not defined.`);
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
            console.log(res);
            setRecords(res);
            resetLoading();
            return res;
        } catch(err) {
            setError(err.message || err);
            resetLoading();
            return null;
        }
    }
    const addStudent = async ()=>{ // Adding student
        setLoading();
        try {
            const res = await logic.addRecord();
            console.log(res);
            return res;
        } catch(err) {  
            setError(err.message || err);
        }
        resetLoading();
    }
    const addCourse = async({courseName, grade, studentId})=>{
        if(!isSet(grade) || !isSet(courseName) || !isSet(studentId)) return;

        setLoading();
        try {
            if(states.records === undefined) {
                await getRecords();
            }
            let record = states.records.find(r=>r.studentId === studentId);
            if(!record) {
                throw new Error("No such student found!");
            }

            const res = await logic.addCourse(states.wallet, record.recordId, courseName, grade);
            console.log(res);
            resetLoading();
            return res;
        } catch(err) {
            setError(err.message || err);
            resetLoading();
            return null;
        }
    }

    return (
        <context.Provider
            value={{
                ...states,
                setError,
                resetError,
                setWallet,
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