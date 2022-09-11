import {
    RECEIVE_AUTH_TOKEN
} from "../actions/types"

const initialState = "";

function authReducer (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case RECEIVE_AUTH_TOKEN:
            return payload;
        default:
            return state
    }
}

export default authReducer;