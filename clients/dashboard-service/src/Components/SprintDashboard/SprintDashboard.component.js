import { injectHTMLToElement } from '../../../utils/dom.service';
import './SignUpForm.style.css';

function SignUpForm({ injectTo }) {
  const SprintDashboardTemplate = `
  <div class="dashboard">
  <div class="dash-header">
      <h1> Sprint Dashboard</h1>
  </div>
  <div class="section1">
      <div class="left">
          <h1 id="count"> </h1>
      </div>
      <div class="right">
          <button id="addtask"><h1>Add Task</h1></button>
          <div id="taskpop" class="popup">
              <div class="input-sec">
                  <label for="description">Description </label>
                  <input type="talbename" placeholder="Enter A Title" id="description" />
              </div>
              <button id="task-btn"><h1>Sumbit</h1></button>
          </div>
          <button id="addtable"><h1>Add Table</h1></button>
          <div id="tablepop" class="popup">
              <div class="input-sec">
                  <label for="title">Title </label>
                  <input type="talbename" placeholder="Enter A Title" id="title" />
              </div>
              <div class="input-sec">
                  <label for="color"> Color </label>
                  <input type="talbename" placeholder="Enter A Color" id="color" />
              </div>
              <button id="table-btn"><h1>Sumbit</h1></button>
          </div>
          <button><h1>Backlog</h1></button>
      </div>
  </div>
  <div class="section" id="section">
      <div class="container">
          <div id="title" class="title">
              <div class="title-head">
                  <p class="text"> In Sprint </p>
                  <h2 class="counter"> %</h2>
              </div>
              <div class="progress">
                  <div class="colordiv" style="background-color: yellow;"></div>    
              </div>   
          </div>
          <p class="draggable" draggable="true">3</p>
          <p class="draggable" draggable="true">4</p>
      </div>
      <div class="container">
          <div id="title" class="title">
              <div class="title-head">
                  <p class="text"> In Progress </p>
                  <h2 class="counter"> %</h2>
              </div>
              <div class="progress">
                  <div class="colordiv" style="background-color: blue;"></div>    
              </div>  
          </div>
          <p class="draggable" draggable="true">3</p>
          <p class="draggable" draggable="true">4</p>
      </div>
      <div class="container">
          <div id="title" class="title">
              <div class="title-head">
                  <p class="text"> Ready For CR </p>
                  <h2 class="counter"> %</h2>
              </div>
              <div class="progress">
                  <div class="colordiv" style="background-color: purple;"></div>    
              </div>  
          </div>
          <p class="draggable" draggable="true">3</p>
          <p class="draggable" draggable="true">4</p>
      </div>
      <div class="container">
          <div id="title" class="title">
              <div class="title-head">
                  <p class="text"> Completed </p>
                  <h2 class="counter"> %</h2>
              </div>
              <div class="progress">
                  <div class="colordiv" style="background-color: green;"></div>    
              </div> 
          </div>
          <p class="draggable" draggable="true">3</p>
          <p class="draggable" draggable="true">4</p>
      </div>
  </div>
</div>
  `;

  injectHTMLToElement(SprintDashboardTemplate, injectTo);

// ~~~~~~~~~~~~~~~~~~~~draggable Elements~~~~~~~~~~~~~~~~~~~
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
const countDiv = document.getElementById('count')

countDiv.innerHTML = "Total Tasks: "+ draggables.length

containers.forEach(container => {
    container.querySelector('.counter').innerHTML = (container.childElementCount - 1)
    const width = (container.childElementCount - 1)*100/draggables.length
    container.querySelector('.colordiv').style.width = width + '%'
})

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart',() => {
        draggable.classList.add('dragging')
    })
    
    draggable.addEventListener('dragend',() => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null){
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
        containers.forEach(container => {
            container.querySelector('.counter').innerHTML = (container.childElementCount - 1)
            const width = (container.childElementCount - 1)*100/draggables.length
            container.querySelector('.colordiv').style.width = width + '%'
        })
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [... container.querySelectorAll('.draggable:not(.draagging)')]
    
    return  draggableElements.reduce((closet,child) => {
        const box = child.getBoundingClientRect()
        const offset = y -box.top -box.height / 2
        if(offset < 0 && offset > closet.offset){
            return { offset: offset , element: child }
        }else {
            return closet
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


// ~~~~~~~~~~~~~~~~~~~~~~Add Table~~~~~~~~~~~~~~~~~~~~~
const addTablebtn = document.getElementById('addtable')
const section = document.getElementById('section')
const title = document.getElementById('title');
const color = document.getElementById('color');

addTablebtn.onclick = () => {
    const popup = document.getElementById("tablepop")
    popup.classList.toggle("show")
    const tableBtn = document.getElementById("table-btn")

    tableBtn.onclick = () => {
        addTable (title.value,color.value)        
    }  
}

function addTable(title,color){
    const TableTemplate=`
    <div class="container">
        <div id="title" class="title">
            <div class="title-head">
                <p class="text"> ${title} </p>
                <h2 class="counter"> 0 </h2>
            </div>
            <div class="progress">
                <div class="colordiv" style="background-color: ${color};"></div>
            </div>   
        </div>
    </div>
    `
    section.insertAdjacentHTML('beforeend',TableTemplate);
}

// ~~~~~~~~~~~~~~~~~~~~~~Add Task~~~~~~~~~~~~~~~~~~~~~
const addTaskbtn = document.getElementById('addtask')
const description = document.getElementById('description')

addTaskbtn.onclick = () => {
    const popup = document.getElementById("taskpop")
    popup.classList.toggle("show")
    const taskBtn = document.getElementById("task-btn")

    taskBtn.onclick = () => {
        addTask (description.value)        
    }  
}
function addTask(description){
    const TaskTemplate=`
    <p class="draggable" draggable="true">${description}</p>
    `
    containers[0].insertAdjacentHTML('beforeend',TaskTemplate);
}

}

export default SprintDashboard;