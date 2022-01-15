const axios = require("axios");
export function getUser(id) {
    axios.get(`/:${id}`)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.status;
    });
}