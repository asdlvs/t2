import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
    const loading = useSelector(state => state.loading);
    return (
        loading ? (<div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only"></span>
        </div>) : (null)
    )
};

export default Loading;