import Service from "./Service";

const baseUrl = "http://localhost:3080/albums";

const AlbumService = new Service(baseUrl);

export default AlbumService;