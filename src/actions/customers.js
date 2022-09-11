import {
    SEARCH_CUSTOMERS_SUCCESS,
    SEARCH_CUSTOMER_FAIL,
    SELECT_CUSTOMER,
    LOADING_STARTED,
    LOADING_FINISHED
} from "./types"

import CustomersService from "../services/customer-service"

export const searchCustomers = (name) => async (dispatch) => {
    try {
        dispatch({
            type: LOADING_STARTED
        });
        const res = await CustomersService.findByName(name);
        dispatch({
            type: SEARCH_CUSTOMERS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: SEARCH_CUSTOMER_FAIL,
            error: err
        });
    } finally {
        dispatch({
            type: LOADING_FINISHED,
        });
    }
};

export const selectCustomer = (customer) => async (dispatch) => {
    dispatch({
        type: SELECT_CUSTOMER,
        payload: customer
    });
};