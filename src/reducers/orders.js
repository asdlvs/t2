import {
    SEARCH_ORDERS_STARTED,
    SEARCH_ORDERS_SUCCESS,
    SEARCH_ORDERS_FAIL,
    SELECT_ORDER,
    RETRIEVE_ORDER_SUCCESS,
    CREATE_ORDER_SUCCESS,
    SELECT_CUSTOMER
} from "../actions/types"

const initialState = {
    error: "",
    loading: false,
    orders: [],
    selectedOrder: null
}

function ordersReducer (state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {
        case SEARCH_ORDERS_STARTED:
            return {
                error: "",
                loading: true,
                orders: [],
                selectedOrder: null
            };
        case SEARCH_ORDERS_SUCCESS:
            return {
                error: "",
                loading: false,
                orders: payload,
                selectedOrder: null
            };
        case SEARCH_ORDERS_FAIL:
            return {
                error: error.message,
                loading: false,
                orders: [],
                selectedOrder: null
            };
        case SELECT_ORDER:
            return {
                error: "",
                loading: false,
                orders: [],
                selectedOrder: payload
            }
        case RETRIEVE_ORDER_SUCCESS:
            return {
                error: "",
                loading: false,
                orders: [],
                selectedOrder: action.payload
            }
        case CREATE_ORDER_SUCCESS:
            return {
                error: "",
                loading: false,
                orders: [],
                selectedOrder: action.payload
            }
        case SELECT_CUSTOMER:
            return {
                error: "",
                loading: false,
                orders: [],
                selectedOrder: {
                    ...state.selectedOrder,
                    customerName: payload.name,
                    customerId: payload.id,
                    phoneNumber: payload.phoneNumber,
                    email: payload.email
                }
            }
        default:
            return state;
    }
}

export default ordersReducer;