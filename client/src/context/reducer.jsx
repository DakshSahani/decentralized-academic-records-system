import { 
    SET_ERROR,
    SET_WALLET, 
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
    throw new Error("No Such action in ChangesReducer");
}