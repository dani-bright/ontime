const baseUrl = "http://localhost:3080/users";

class UserService {

    static async create(body) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        return await fetch(`${baseUrl}`, init);
    }

    static async findAll() {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}`, init);
    }

    static async remove(id) {
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}/${id}`, init);
    }

    static async findOne(id) {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}/${id}`, init);
    }

    static async update(id, body) {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        return await fetch(`${baseUrl}/${id}`, init);
    }

    static async auth(body) {
        const init = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        return await fetch(`${baseUrl}/authenticate`, init);
    }
}

export default UserService;