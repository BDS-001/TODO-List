function changeView(view) {
    const content = document.querySelector('#content')
    content.innerHTML = view
}

function setNavEvents() {
    const sidebar = document.querySelectorAll('.inbox-category')
    sidebar.forEach(function(menu) {
        const link = menu.querySelector('a')
        link.addEventListener('click', getContent)
    })
}

function getContent(e) {
    e.preventDefault()
    changeView(e.target.innerHTML)
    hilightElement(e)
}

function addProjectClickEvent() {
    const addProjectButton = document.querySelector('#add-project')
    addProjectButton.addEventListener('click', addProject)
}
function addProject(e) {
    e.preventDefault() 
}

function hilightElement(e) {
    const parent = e.target.parentNode;
    parent.style.backgroundColor = 'green';
}

const initialPageLoad = (function() {
    setNavEvents()
    addProjectClickEvent()
})();