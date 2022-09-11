import {
    SEARCH_ORDERS_SUCCESS,
    SEARCH_ORDERS_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    SELECT_ORDER,
    RETRIEVE_ORDER_FAIL,
    RETRIEVE_ORDER_SUCCESS,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    LOADING_STARTED,
    LOADING_FINISHED
} from "./types"

import OrdersService from "../services/order-service"

const makeRequestWithLoading = async (dispatch, value, success, fail) => {
    try {
        dispatch({
            type: LOADING_STARTED,
        });
        const response = await value();
        dispatch({
            type: success,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: fail,
            error: e
        });
    } finally {
        dispatch({
            type: LOADING_FINISHED,
        });
    }
}

export const searchOrders = (text) => async (dispatch) => {
    await makeRequestWithLoading(
        dispatch,
        () => OrdersService.findByText(text),
        SEARCH_ORDERS_SUCCESS,
        SEARCH_ORDERS_FAIL
    );
};

export const createOrder = (order) => async (dispatch) => {
    await makeRequestWithLoading(
        dispatch,
        () => OrdersService.create(order),
        CREATE_ORDER_SUCCESS,
        CREATE_ORDER_FAIL
    );
}

export const updateOrder = (order) => async (dispatch) => {
    await makeRequestWithLoading(
        dispatch,
        () => OrdersService.update(order.id, order),
        CREATE_ORDER_SUCCESS,
        CREATE_ORDER_FAIL
    );
}

export const deleteOrder = (id) => async (dispatch) => {
    await makeRequestWithLoading(
        dispatch,
        () => OrdersService.deleteOrder(id),
        DELETE_ORDER_SUCCESS,
        DELETE_ORDER_FAIL
    );
}


export const getOrder = (id) => async (dispatch) => {
    await makeRequestWithLoading(
        dispatch,
        () => OrdersService.get(id),
        RETRIEVE_ORDER_SUCCESS,
        RETRIEVE_ORDER_FAIL
    );
}

export const selectOrder = (order) => dispatch => {
    dispatch({
        type: SELECT_ORDER,
        payload: order
    });
}