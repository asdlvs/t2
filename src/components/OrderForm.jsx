import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getOrder, updateOrder, deleteOrder } from "../actions/orders";
import { retrieveServices } from "../actions/services"
import { searchCustomers } from "../actions/customers"
import CustomersList from "./CustomersList";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router';

const OrderForm = () => {

    const initialValue = useMemo(
        () => {
            return {
                id: 0,
                fromAddress: "",
                toAddress: "",
                comment: "",
                customerId: 0,
                customerName: "",
                phoneNumber: "",
                email: "",
                services: []
            }
        }, []
    );;

    const [order, setOrder] = useState(initialValue);
    const [searchName, setSearchName] = useState("");
    const [services, setServices] = useState([]);
    const dispatch = useDispatch();

    const customers = useSelector(state => state.customers);
    const selectedOrder = useSelector(state => state.orders.selectedOrder);
    const loadedServices = useSelector(state => state.services.services);
    // const auth = useSelector(state => state.auth);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && id > 0) {
            dispatch(getOrder(id));
        }
        dispatch(retrieveServices());
    }, [id]);

    // useEffect(() => {
    //     const c = customers.currentCustomer;
    //     if (c.id > 0) {
    //         setOrder({
    //             ...order,
    //             customerId: c.id,
    //             customerName: c.name,
    //             phoneNumber: c.phoneNumber,
    //             email: c.email
    //         });
    //     }

    // }, [customers.currentCustomer, order]);

    useEffect(() => {
        setOrder({
            ...initialValue,
            ...selectedOrder
        });
    }, [selectedOrder, initialValue]);

    useEffect(() => {
        setServices(loadedServices);
    }, [loadedServices]);

    const saveOrder = () => {
        const orderToCreate = {
            ...order,
            customerId: order.customerId,
            customerName: order.customerName,
            phoneNumber: order.phoneNumber,
            email: order.email
        }
        if (order.id === 0) {
            dispatch(createOrder(orderToCreate));
        } else {
            dispatch(updateOrder(orderToCreate));
        }
    }

    const deleteOrderHandler = () => {
        dispatch(deleteOrder(order.id));
        setOrder(initialValue);
        navigate('/orders');
    }

    const searchCustomersByName = () => {
        dispatch(searchCustomers(searchName));
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setOrder({ ...order, [name]: value, customerId: 0 });
        if (event.target.name === "customerName") {
            setSearchName(event.target.value);
        }
    };

    const handleCheckboxChange = (event, svc) => {
        const exist = order.services.find(s => s.id === svc.id);
        if (event.target.checked && !exist) {
            setOrder({
                ...order,
                services: [
                    ...order.services,
                    svc
                ]
            });
        }
        else if (!event.target.checked && exist) {
            setOrder({
                ...order,
                services: [
                    ...order.services.filter(s => s.id !== svc.id),
                ]
            });
        }
    };

    const handleIsDoneCheckBox = (event, svc) => {
        setOrder({
            ...order,
            services: [
                ...order.services.filter(s => s.id !== svc.id),
                {
                    ...svc,
                    [event.target.name]: event.target.checked
                }
            ]
        });
    };

    const handleServiceDataChange = (event, svc) => {
        setOrder({
            ...order,
            services: [
                ...order.services.filter(s => s.id !== svc.id),
                {
                    ...svc,
                    [event.target.name]: event.target.value
                }
            ]
        });
    };

    return (
        <div className="row flex-xl-nowrap">
            {customers.customers.length > 0 ? (
                <CustomersList />
            ) : (
                <div className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            value={order.customerName}
                            name="customerName"
                            placeholder="Customer Name"
                            onChange={handleInputChange}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={searchCustomersByName} type="button">Find</button>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text"
                            className="form-control"
                            value={order.phoneNumber}
                            name="phoneNumber"
                            placeholder="Phone"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text"
                            className="form-control"
                            value={order.email}
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange} />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={order.fromAddress} onChange={handleInputChange} name="fromAddress" placeholder="From" />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" value={order.toAddress} onChange={handleInputChange} name="toAddress" placeholder="To" />
                    </div>
                    <div className="input-group mb-3">
                        <textarea className="form-control" value={order.comment} onChange={handleInputChange} name="comment" placeholder="Comment"></textarea>
                    </div>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Is Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services && services.length > 0 ? services.map((service, index) => {
                                    const orderService = order.services.find(s => s.id === service.id);
                                    return (
                                        <tr key={index}>
                                            <th scope="row"><input
                                                type="checkbox"
                                                checked={orderService ? "checked" : ""}
                                                name={"service_" + service.id}
                                                onChange={(event) => handleCheckboxChange(event, service)}
                                            /></th>
                                            <td>{service.name}</td>
                                            <td><input type="text" name="plannedDate" value={orderService && orderService.plannedDate ? orderService.plannedDate : ""} onChange={(event) => handleServiceDataChange(event, service)} /></td>
                                            <td><input type="checkbox"
                                                checked={orderService && orderService.isDone ? "checked" : ""}
                                                name="isDone"
                                                onChange={(event) => handleIsDoneCheckBox(event, service)}
                                            /></td>
                                        </tr>
                                    )
                                }) : (null)}
                            </tbody>
                        </table>
                    </div>
                    <button className="btn btn-outline-secondary" onClick={saveOrder} type="button">{
                        order.id > 0 ? "Update" : "Create"
                    }</button>
                    {
                        order.id > 0 ? (<button className="btn btn-outline-secondary" onClick={deleteOrderHandler} type="button">Delete</button>) : (<span />)
                    }

                </div>)}
        </div>
    );
}

export default OrderForm;