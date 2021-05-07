import http from "../http-common";

class CriminalCodeService {
    get(id) {
        return http.get(`/CriminalCode/${id}`);
    }

    getAll() {
        return http.get("/CriminalCode");
    }

    create(data) {
        return http.post("/CriminalCode", data);
    }

    update(data) {
        return http.put(`/CriminalCode/${data.id}`, data);
    }

    delete(id) {
        return http.delete(`/CriminalCode/${id}`);
    }
}

export default new CriminalCodeService();