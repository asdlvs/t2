import {
    CREATE_ORDER_STARTED,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    
} from "../actions/types"

const emptyOrder = {
    id: 0,
    fromAddress: "",
    toAddress: "",
    comment: "",
    customerId: 0,
    customerName: "",
    phoneNumber: "",
    email: "",
    services: []
}

export const initialState = {
    order: emptyOrder,
    loading: false,
    error: ""
};

function crudOrderReducer (state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {
        case CREATE_ORDER_STARTED:
            return {
                error: "",
                loading: true,
                order: payload
            };
        case CREATE_ORDER_SUCCESS:
            return {
                error: "",
                loading: false,
                order: payload
            };
        case CREATE_ORDER_FAIL:
            return {
                error: error.message,
                loading: false,
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...initialState,
            };
        case DELETE_ORDER_FAIL:
            return {
                error: error.message,
                loading: false,
            };
        default:
            return state;
    }
}

export default crudOrderReducer