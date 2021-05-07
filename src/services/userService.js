import http from "../http-common";

class UserService {
    get(id) {
        return http.get(`/User/${id}`);
    }

    getAll() {
        return http.get("/User");
    }

    create(data) {
        return http.post("/User", data);
    }

    login(data) {
        return http.post("/User/login", data);
    }
}

export default new UserService();