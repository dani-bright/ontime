import Service from "./Service";

const baseUrl = "http://localhost:3080/authors";

const AuthorService = new Service(baseUrl);

export default AuthorService;