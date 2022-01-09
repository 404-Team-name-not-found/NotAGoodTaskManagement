

const content = document.getElementById ('content')

// function dynamicallyLoadScript(url) {
//     var script = document.createElement("../Task-Dashboard/dash1.js");  
//     script.src = url; 
   
//     document.head.appendChild(script); 
// }

var ajax = new XMLHttpRequest();
ajax.open("GET", "../Task-Dashboard/ex.html", false);
ajax.send();
content.innerHTML += ajax.responseText;