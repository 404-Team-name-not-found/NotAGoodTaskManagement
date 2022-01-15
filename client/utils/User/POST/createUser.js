import { generateDefaultValues } from "../../General/generateDefaultValues";
const axios = require("axios");
export function createUser(email, username, password) {
    axios.post("/add", generateDefaultValues({
        email:    email, 
        username: username,
        password: password 
    })).catch((error) => {
        return error.data;
    });
}