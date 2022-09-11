import http from "../http-common";

const findByText = (text) => {
    return http.get(`orders?text=${text}`);
}

const create = data => {
    return http.post("/orders", data);
};

const update = (id, data) => {
    return http.put(`/orders/${id}`, data);
};


const get = id => {
    return http.get(`/orders/${id}`);
};

const deleteOrder = id => {
    return http.delete(`/orders/${id}`);
}

const OrdersService = {
    findByText,
    create,
    get,
    update,
    deleteOrder
};

export default OrdersService;