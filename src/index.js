import { openModal, closeModal } from "./add-project-modal"
import { Project, Task } from "./projects"

const navigation = (function() {
    function changeView(view) {
        const content = document.querySelector('#content')
        content.innerHTML = view
    }
    
    function getContent(e) {
        e.preventDefault()
        changeView(e.target.innerHTML)
        hilightElement(e)
    }
    
    function hilightElement(e) {
        const inbox = document.querySelectorAll('.inbox-category')
        inbox.forEach(function(element) {
            element.style.backgroundColor = 'inherit';
        })
        const parent = e.target.parentNode;
        parent.style.backgroundColor = 'var(--hilight-sidebar)';
    }

    function setup() {
        const inbox = document.querySelectorAll('.inbox-category')
        inbox.forEach(function(menu) {
            const link = menu.querySelector('a')
            link.addEventListener('click', getContent)
        })
    }

    return {setup}
})();

const projectsTab = (function() {
    function addProject(e) {
        e.preventDefault()
        openModal()
    }

    function addProjectClickEvent() {
        const addProjectButton = document.querySelector('#add-project')
        addProjectButton.addEventListener('click', addProject)
    }
    
    function closeModalEventListener() {
        const closeButton = document.querySelector('.close-btn')
        closeButton.addEventListener('click', closeModal)
    }

    function setup() {
        addProjectClickEvent()
        closeModalEventListener()
    }

    return {setup}
})();

const initialPageLoad = (function() {
    navigation.setup()
    projectsTab.setup()
})();