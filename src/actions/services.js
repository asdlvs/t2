import {
    RETRIEVE_SERVICES_SUCCESS,
    RETRIEVE_SERVICES_FAIL
} from "./types"

import ServicesService from "../services/services-service"

export const retrieveServices = () => async (dispatch) => {
    try {
        const services = await ServicesService.list();
        dispatch({
            type: RETRIEVE_SERVICES_SUCCESS,
            payload: services.data
        });

    } catch (err) {
        dispatch({
            type: RETRIEVE_SERVICES_FAIL,
            error: err
        });
    }
};