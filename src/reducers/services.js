import {
    RETRIEVE_SERVICES_SUCCESS,
    RETRIEVE_SERVICES_FAIL
} from "../actions/types"

const initialState = {
    services: [],
    error: ""
};

function servicesReduces (state = initialState, action) {
    const {type, payload, error} = action;

    switch (type) {
        case RETRIEVE_SERVICES_SUCCESS:
            return {
                services: payload,
                error: ""
            };
        case RETRIEVE_SERVICES_FAIL:
            return {
                services: [],
                error: error
            };
        default:
            return state;
    }
}

export default servicesReduces;