import { generateDefaultImage } from "./generateDefaultImage"
export function generateDefaultValues({email, username, password}) {
    return {
        email: email,
        username: username,
        password: password,
        imgUrl: generateDefaultImage(username),
        title: "",
        role: "",
        name: "",
        phone: "",
        groupid: 0
    }
}