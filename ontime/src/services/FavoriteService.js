import Service from "./Service";

const baseUrl = "http://localhost:3080/favorites";

class FavoriteService extends Service {
    async findAll(userId) {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}/${userId}`, init);
    }

    async findOne(userId, songId) {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}/${userId}/${songId}`, init);
    }
}

const FavoriteServiceInstance = new FavoriteService(baseUrl);

export default FavoriteServiceInstance;