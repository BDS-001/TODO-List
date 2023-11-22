function changeView(view) {
    const content = document.querySelector('#content')
    content.innerHTML = view
}

function setNavEvents() {
    const sidebar = document.querySelectorAll('.sidebar-entry')
    sidebar.forEach(function(menu) {
        const link = menu.querySelector('a')
        link.addEventListener('click', getContent)
    })
}

function getContent(e) {
    e.preventDefault()
    console.log(e.target)
    changeView(e.target.innerHTML)
}

function addProjectClickEvent() {
    const addProjectButton = document.querySelector('#add-project')
    addProjectButton.addEventListener('click', addProject)
}
function addProject(e) {
    e.preventDefault() 
}

const initialPageLoad = (function() {
    setNavEvents()
    addProjectClickEvent()
})();