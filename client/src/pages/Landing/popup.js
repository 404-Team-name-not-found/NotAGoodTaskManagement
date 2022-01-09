const start = document.getElementById('start')
const popup = document.getElementById('new')


const comp1 = fetch("../Sign-Up/ex.html").then(r => r.text()).then(data => comp1 = data)

start.addEventListener('click' , () => {
    console.log('hey')
    // popup.innerHTML = comp1 
})
