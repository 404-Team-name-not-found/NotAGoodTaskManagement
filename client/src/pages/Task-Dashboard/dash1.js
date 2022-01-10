const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
const countDiv = document.getElementById('count')

countDiv.innerHTML = "Total Tasks: "+ draggables.length

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
            container.querySelector('count').innerHTML = "@" + container.querySelectorAll('.draggable').length
        } else {
            container.insertBefore(draggable, afterElement)
            container.querySelector('count').innerHTML = "@" + container.querySelectorAll('.draggable').length
        }
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



