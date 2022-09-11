import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchOrders, selectOrder } from "../actions/orders"
import { useNavigate } from 'react-router';


const MainFrom = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
        
    const onChangeSearchText = e => {
        const searchText = e.target.value;
        setSearchText(searchText);
    };

    const searchByText = () => {
        if (searchText) {
            dispatch(searchOrders(searchText));
            setSearchText("");
        }
    }

    const onSearchFieldEnter = event => {
        if (event.key === 'Enter') {
            searchByText();
            navigate('/orders');
        }
    }

    const onCreateNew = () => {
        navigate('/orders/new');
        dispatch(selectOrder(null));
    }

    return (
        <div>
            <label htmlFor="basic-url">Find orders:</label>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchText}
                    onChange={onChangeSearchText}
                    onKeyDown={onSearchFieldEnter} />
            </div>
            Or   <button type="button" className="btn btn-primary" onClick={onCreateNew}>Create New</button>
        </div>

    );
}

export default MainFrom;