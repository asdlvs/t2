import {
    CREATE_CUSTOMER,
    CREATE_CUSTOMER_SUCCESS,
    CREATE_CUSTOMER_FAIL,
    SEARCH_CUSTOMERS,
    SEARCH_CUSTOMERS_SUCCESS,
    SELECT_CUSTOMER
} from "../actions/types";

const initialState = {
    currentCustomer: {
        id: 0,
        name: "",
        phoneNumber: "",
        email: ""
    },
    customers: [],
    loading: false,
};

function customerReducer (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case CREATE_CUSTOMER:
            return {
                ...initialState,
                currentCustomer: payload,
                loading: true
            };
        case CREATE_CUSTOMER_SUCCESS:
            return {
                ...initialState,
                currentCustomer: payload,
                loading: false
            };
        case CREATE_CUSTOMER_FAIL:
            return state;
        case SEARCH_CUSTOMERS:
            return {
                ...initialState,
                loading: true,
            };
        case SEARCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: payload,
            };
        case SELECT_CUSTOMER:
            return {
                ...initialState,
                currentCustomer: payload,
                customers: [],
            };
        default:
            return state;
    }
}

export default customerReducer;