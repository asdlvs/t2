import { combineReducers } from "redux";
import customers from "./customers";
import orders from "./orders";
import crudOrder from "./crud-order";
import services from "./services";
import loading from "./loading";
import auth from "./auth";

export default combineReducers({
    customers,
    orders,
    crudOrder,
    services,
    loading,
    auth
});