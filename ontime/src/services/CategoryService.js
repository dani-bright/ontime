const baseUrl = "http://localhost:3080/categories";

class CategoryService {
    static async findAll() {
        const init = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        };
        return await fetch(`${baseUrl}`, init);
    }

}

export default CategoryService;