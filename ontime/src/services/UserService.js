import Service from "./Service";

const baseUrl = "http://localhost:3080/users";

class UserService extends Service {
    constructor(baseUrl) {
        super(baseUrl);
    }


    async auth(body) {
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

const UserServiceInstance = new UserService(baseUrl);

export default UserServiceInstance;