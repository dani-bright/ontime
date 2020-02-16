import Service from "./Service";

const baseUrl = "http://localhost:3080/songs";

const SongService = new Service(baseUrl);

export default SongService;