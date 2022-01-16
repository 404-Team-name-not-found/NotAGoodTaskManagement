
import { injectHTMLToElement } from '../../utils/dom.service';
import "./CreateTask.style.css"
import axios from 'axios';
import CardHeader from "../CardHeader/CardHeader.component";
function CreateTask ({ injectTo }){
    const FormTemplate = `   
  
    <button id="AddTaskBtn" type="button"  class="btn btn-primary" >Create </button>
    <div class="popup popuptext" id="myPopup" >
    <div id="header"></div>
            <div class="input"> 
                <div class="firstInput">
                    <p class="title" >Title<span class="must">*</span></p> <p class="title two">Assign<span class="must">*</span></p> <br> 
                </div>
                <div class="firstInput">
                       <input  class="text one" type="text" id="title"> 
                       <input  class="text one" type="text" id="users"> 
                       
                </div>
            </div>
            <div class="input"> 
                <div class="firstInput">
                    <p class="title" >Target Date</p> <p class="title two">Project <span class="must">*</span></p> <br>
                </div>
                <div class="firstInput">
                    <input  class="text one" type="date" id="estimation" min="2022-01-10" max="2022-12-31">  <input class="text one" type="text" id="project">
                </div>
            </div>
            <div class="input des"> <p class="title">Issue Description <span class="must">*</span></p><br><input type="text" class="text des" id="description"></div>
            <div class="input des"><p class="title">Story<span class="must">*</span></p><br> <input type="text" id="story"></div>
           
            <div class="bottom">
                <button id="SendCreateTask" type="button" class="btn btn-warning">Add</button> 
                <button id="CloseBtn" type="button" class="btn btn-secondary" >Close</button>
            </div>
            <div id="editText"></div>
            </div> 
    `;

injectHTMLToElement(FormTemplate, injectTo);
const head = document.getElementById("header")
CardHeader({injectTo : head , title:"ADD"})
const Btn = document.getElementById("AddTaskBtn")
var SendBtn = document.getElementById("SendCreateTask")
var CloseBotton = document.getElementById("CloseBtn");
CloseBotton.onclick = function() {closeFunc()};
Btn.onclick = function() {myFunction()};
SendBtn.onclick = function() {AddFunc()};
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  } 
  var title = document.getElementById("title").value;
var story = document.getElementById("story").value;
var estimationDate =" "
document.getElementById("estimation").addEventListener("change", function() {
    estimationDate= this.value;
});
var assign = document.getElementById("users").value;
var project = document.getElementById("project").value;
var description = document.getElementById("description").value;
var text = document.getElementById("editText")
var popup = document.getElementById("myPopup")
// CardHeader({ injectTo:popup , title: 'Create Task' });
function closeFunc() {
    window.location.reload();
}
// const users ={}
// async function getUser() {
//     try {
      //    const response = await axios.get('http::localhost:8080/get');
    //    users = response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

function AddFunc (){
    text.innerText=" "
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    if(story == '' || title =='' || estimationDate == '' || 
       assign ==  '' || project == '' )
       {
           text.innerText = "you must enter values where id needed !"
       }
       else{
           axios.post("http::localhost:8080/add", {story: story, title: title, description: description , targetDate: estimationDate , 
            currentDate : today , project : project 
        }).then(response => {
            if(response.data=== "ok" )
            console.log("success - create task")
            else{
                console.log(response.data)}
        })
       }

} 
}
export default CreateTask;

 // <select name="users" id="users">
                        // <option value="*">None</option>
                        // </select>