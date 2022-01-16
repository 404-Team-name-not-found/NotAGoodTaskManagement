// import { injectHTMLToElement } from '../../utils/dom.service';

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
        // console.log(afterElement)
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