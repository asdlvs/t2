import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest, msalConfig } from "../auth.config";
import { useSelector } from "react-redux";

const handleLogin = async (instance) => {
    try {
        await instance.loginRedirect(loginRequest);
    } catch (e) {
        console.error(e);
    };
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <input type="button" className="btn btn-primary" onClick={() => handleLogin(instance)} value="Login" />
    );
}

const handleLogout = async (instance, accountId) => {
    try {
        await instance.logoutRedirect({
            mainWindowRedirectUri: msalConfig.postLogoutRedirectUri,
            accountId:accountId
        });
    } catch (e) {
        console.error(e);
    };
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();
    const auth = useSelector(state => state.auth);

    return (
        <input type="button" variant="secondary" className="btn btn-primary"  onClick={() => handleLogout(instance, auth.accountId)} value="Logout" />
    );
}