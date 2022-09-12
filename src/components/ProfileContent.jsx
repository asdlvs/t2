import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useMsal } from "@azure/msal-react";
import { requestAccessToken } from "../actions/auth"
import { SignOutButton } from "./SingButtons";

const ProfileContent = () => {
    
    const auth = useSelector(state => state.auth);
    const { instance, accounts } = useMsal();
    const dispatch = useDispatch();

    // eslint-disable-next-line
    useEffect(() => {
        dispatch(requestAccessToken(accounts, instance));
    }, []);

    const name = accounts[0] && accounts[0].name;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <h5 className="card-title">Welcome {name}</h5>
                        {auth ?
                            <p>You can use the app.</p>
                            :
                            <p>You can't use the app.</p>
                        }
                    </div>
                    <div className="col-sm">
                        <SignOutButton />
                    </div>
                    <div className="col-sm">
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileContent;
