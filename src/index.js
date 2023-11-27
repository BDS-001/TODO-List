import { openModal, closeModal } from "./add-project-modal"
import { Project, Task } from "./projects"

function changeView(view) {
    const content = document.querySelector('#content')
    content.innerHTML = view
}

function setNavEvents() {
    const inbox = document.querySelectorAll('.inbox-category')
    inbox.forEach(function(menu) {
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
    openModal()
}

function closeModalEventListener() {
    const closeButton = document.querySelector('.close-btn')
    closeButton.addEventListener('click', closeModal)
}

function hilightElement(e) {
    const inbox = document.querySelectorAll('.inbox-category')
    inbox.forEach(function(element) {
        element.style.backgroundColor = 'inherit';
    })
    const parent = e.target.parentNode;
    parent.style.backgroundColor = 'var(--hilight-sidebar)';
}

const initialPageLoad = (function() {
    setNavEvents()
    addProjectClickEvent()
    closeModalEventListener()
})();