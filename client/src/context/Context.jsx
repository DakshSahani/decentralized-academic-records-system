import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import { 
    SET_ERROR,
    SET_WALLET, 
} from "./action";

const context = React.createContext();

export const initialStates = {
    error: false,
    errorMessage: undefined,
    wallet: {},
}

export const ContextProvider = ({children})=>{
    const [states, dispatch] = useReducer(reducer, initialStates);
    
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

    const resetError = () => {
        dispatch({
            type: SET_ERROR,
            payload: {error: false}
        })
    }

    const setWallet = (wallet)=>{
        dispatch({
            type: SET_WALLET,
            payload: {wallet,}
        })
    };

    return (
        <context.Provider
            value={{
                ...states,
                setError,
                resetError,
                setWallet,
            }}
        >
            {children}
        </context.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(context)
}