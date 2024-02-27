import React, { useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import { 
    SET_ERROR,
    SET_WALLET, 
    RESET_WALLET, 
    SET_LOADING, 
    SET_RECORDS, 
    SET_ADMIN, 
    SET_LOGIN_LOADING, 
} from "./action";
import toast from "react-hot-toast";
import logic from "../interface/logic";


const context = React.createContext();

export const initialStates = {
    error: false,
    errorMessage: undefined,
    wallet: undefined,
    loading: false,
    loginLoading: false, 
    records: undefined,
    admin: false, 
}

export const ContextProvider = ({children})=>{
    const [states, dispatch] = useReducer(reducer, initialStates);
    
    const setError = (message) => {
        if(!message) message = "Something went wrong";

        dispatch({
            type: SET_ERROR,
            payload: { 
                error: true, 
                message, 
            }
        });

        setTimeout(()=>{
            dispatch({
                type: SET_ERROR,
                payload: {error: false, message: states.errorMessage}
            })
        }, 3000);
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
        dispatch({ 
            type: SET_ADMIN,
            payload: {admin: false}
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
        let res = undefined;
        try {
            res = await logic.getRecords();
            setRecords(res);
        } catch(err) {
            setError(err.message || err);
        }
        resetLoading();
        return res;
    }

    const addStudent = async (studentName, studentId)=>{ // Adding student
        setLoading();
        let res = undefined;
        try {
            if(!isSet( states.wallet))
                throw new Error("Account is not set");
            if(!isSet(studentName) || !isSet(studentId)) {
                throw new Error("student-id or student name is missing")
            }
            if(!states.wallet) throw new Error("Not Login!");
            res = await logic.addRecord(states.wallet, studentName, studentId);
            await getRecords()
            
            toast.success("Student Added Successfully!");
        } catch(err) {  
            setError(err.message || err);
        }
        resetLoading();
        return res;
    }

    const addCourse = async(recordId, courseName, grade)=>{
        setLoading();
        let res = undefined;
        try {
            if(!isSet(states.records)) throw new Error("Something went wrong!")
            if(!isSet(states.wallet))
                throw new Error("Account not found");
            if(!isSet(grade) || !isSet(courseName) || !isSet(recordId))
                throw new Error("Course name or grade is not valid");
            if(grade < 0 || grade > 100) 
                throw new Error("Invalid value of grade");
            if(recordId >= states.records.length)
                throw new Error("Invalid student is selected");
            for(let key of states.records[recordId]?.courses.keys()){
                if(key.toLowerCase() === courseName.toLowerCase())
                    throw new Error(`${courseName} course already exits in records`);
            }
            res = await logic.addCourse(states.wallet,recordId, courseName, grade);
            await getRecords()
        } catch(err) {
            setError(err.message || err);
        }
        resetLoading();
        return res;
    }

    const setLoginLoading = (loading=false)=>{
        dispatch({
            type: SET_LOGIN_LOADING, 
            payload: loading, 
        })
    }
    const setAdmin = async (wallet)=>{
        setLoginLoading(true);
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
        setLoginLoading(false);
        return res;
    }

    useEffect(()=>{
        getRecords()
        .then((res) =>{
            dispatch({
                type: SET_RECORDS,
                payload:{
                    records: res
                }
            })
        })
        .catch(err=>setError(err.message));

    // eslint-disable-next-line
    }, []);

    return (
        <context.Provider
            value={{
                ...states,
                setError,
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