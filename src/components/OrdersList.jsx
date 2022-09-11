import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectOrder } from "../actions/orders"

const OrdersList = () => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOrderSelection = (order) => {
        dispatch(selectOrder(order));
        navigate(`/orders/${order.id}`);
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Services</th>
                    <th scope="col">Comment</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={index} onClick={() => handleOrderSelection(order)}>
                        <th scope="row">{order.id}</th>
                        <td>{order.customerName}</td>
                        <td>{order.phoneNumber}</td>
                        <td>{order.email}</td>
                        <td>{order.fromAddress}</td>
                        <td>{order.toAddress}</td>
                        <td></td>
                        <td>{order.comment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default OrdersList;