import http from "../http-common"

const getAll = () => {
    return http.get("/customers");
};

const create = data => {
    return http.post("/customers", data);
};

const update = (id, data) => {
    return http.put(`/customers/${id}`, data);
};

const findByName = name => {
    return http.get(`customers?name=${name}`);
};

const CustomersService = {
    getAll,
    create,
    update,
    findByName
};

export default CustomersService;