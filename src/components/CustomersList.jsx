import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  selectCustomer } from "../actions/customers"

const CustomersList = () => {
    const customers = useSelector(state => state.customers.customers);
    const dispatch = useDispatch();

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => (
                    <tr key={index} onClick={() => dispatch(selectCustomer(customer))}>
                        <th scope="row">{customer.id}</th>
                        <td>{customer.name}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CustomersList;