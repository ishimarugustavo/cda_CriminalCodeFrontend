import http from "../http-common";

class StatusService {
    get(id) {
        return http.get(`/Status/${id}`);
    }

    getAll() {
        return http.get("/Status");
    }

    create(data) {
        return http.post("/Status", data);
    }

    update(data) {
        return http.put(`/Status/${data.id}`, data);
    }

    delete(id) {
        return http.delete(`/Status/${id}`);
    }
}

export default new StatusService();
