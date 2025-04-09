import axios from "axios";

const instance = axios.create({baseURL:"http://localhost:3002/profile"})

export default instance
