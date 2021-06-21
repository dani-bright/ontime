import Service from "./Service";

const baseUrl = "http://localhost:3080/categories";

const CategoryService = new Service(baseUrl);

export default CategoryService;