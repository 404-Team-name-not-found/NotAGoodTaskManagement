const axios = require("axios");
export function updateUser(email, username, imgUrl, title, role, name, phone, groupid) {
    axios.patch(`/edit/:${email}`, {
        email: email,
        username: username,
        imgUrl: imgUrl,
        title: title,
        role: role,
        name: name,
        phone: phone,
        groupid: groupid
    }).catch((error) => {
        return error.data;
    });
}