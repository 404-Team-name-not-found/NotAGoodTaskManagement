import { injectHTMLToElement } from "../../../utils/dom.service";
import "./ProfileDisplayForm.style.css";
function getUserData(user) {
    return { userEmail: "hello", userDisplayName: "hello", userDisplayImage: "https://www.tremplin-numerique.org/wp-content/uploads/2021/08/1629557521_Comment-changer-votre-photo-de-profil-Discord.png" }
};
const { userEmail, userDisplayName, userDisplayImage } = getUserData("id");

function ProfileDisplayForm({ injectTo }) {
    const FormTemplate = `
    <img src="${userDisplayImage}">
    <form id="form" class="form">
      <div class="form-control">
      <label for="username">Username</label>
      <input type="text" placeholder="${userDisplayName}" id="username" />
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>
      
      <div class="form-control">
      <label for="username">Email</label>
      <input type="email" placeholder="${userEmail? userEmail : "name@email.com"}" id="email" />
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-exclamation-circle"></i>
      <small>Error message</small>
      </div>
      <button><h1>Update</h1></button>
    </form>
    `
    injectHTMLToElement(FormTemplate, injectTo);
}
export default ProfileDisplayForm;