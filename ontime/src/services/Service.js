export default class Service {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async create(body) {
        const init = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        return await fetch(`${this.baseUrl}`, init);
    }

    async findAll() {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${this.baseUrl}`, init);
    }

    async findOne(id) {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${this.baseUrl}/${id}`, init);
    }

    async update(id, body) {
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        };
        return await fetch(`${this.baseUrl}/${id}`, init);
    }

    async remove(id) {
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${this.baseUrl}/${id}`, init);
    }
}