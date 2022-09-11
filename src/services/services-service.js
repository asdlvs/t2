import http from "../http-common";

const list = () => {
    return http.get("services");
};

const ServicesService = {
    list
};

export default ServicesService;