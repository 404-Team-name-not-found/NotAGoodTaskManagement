
var title = document.getElementById("title").value;
var story = document.getElementById("story").value;
var Today;
var estimationDate = document.getElementById("estimation").value;
var assign = document.getElementById("users").value;
var project = document.getElementById("project").value;
var description = document.getElementById("description").value;
var text = document.getElementById("editText")
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  } 
   function closeFunc() {
        window.location.reload();
    }
    async function AddFunc (){
        console.log(estimationDate);
        if(story == '' || title =='' || estimationDate == '' || 
           assign ==  '' || project == '' )
           {
               text.innerText = "you must enter values !"
           }
          // fetch("http//localhost:8080/storys")
    console.log(assign)
    } 