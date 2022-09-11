
import {
    RECEIVE_AUTH_TOKEN
} from './types'


import { loginRequest } from "../auth.config";

export const requestAccessToken = (accounts, instance) => async (dispatch) => {

    const request = {
        ...loginRequest,
        account: accounts[0]
    };

    try {
        const response = await instance.acquireTokenSilent(request);
        console.log(response);
        dispatch({
            type: RECEIVE_AUTH_TOKEN,
            payload: {
                accessToken: response.accessToken,
                idToken: response.idToken,
                accountId: response.account.homeAccountId
            }
        })
    } catch (e) {
        const response = instance.acquireTokenPopup(request);
        console.log(response.accessToken);
        dispatch({
            type: RECEIVE_AUTH_TOKEN,
            payload: {
                accessToken: response.accessToken,
                idToken: response.idToken,
                accountId: response.account.homeAccountId
            }
        })
    }
}