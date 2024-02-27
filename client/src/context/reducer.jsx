import { 
    SET_ERROR,
    SET_WALLET, 
    RESET_WALLET, 
    SET_LOADING,
    SET_RECORDS, 
    SET_ADMIN, 
} from "./action";

export default function reducer(states, action) {
    if(action.type === SET_ERROR) {
        if(action.payload.error === undefined) {
            action.payload.error = false;
        }

        return {
            ...states, 
            error: action.payload.error,
            errorMessage: action.payload.message,
        }
    }

    if(action.type === SET_WALLET) {
        return {
            ...states,
            wallet: action.payload.wallet,
        }
    }
    if(action.type === RESET_WALLET) {
        return {
            ...states,
            wallet: undefined,
        };
    }
    
    if(action.type === SET_LOADING) {
        return {
            ...states,
            loading: action.payload.loading, 
        }
    }
    if(action.type === SET_RECORDS) {
        return {
            ...states,
            records: action.payload.records,
        }
    }
    if(action.type === SET_ADMIN) {
        return {
            ...states,
            admin: action.payload.admin, 
        }
    }
    throw new Error("No Such action in ChangesReducer");
}