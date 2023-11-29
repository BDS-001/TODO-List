import { openModal, closeModal, submitForm } from "./add-project-modal"
import { hilight } from "./hilight";

const navigation = (function() {
    function changeView(view) {
        const content = document.querySelector('#content')
        content.innerHTML = view
    }
    
    function getContent(e) {
        e.preventDefault()
        changeView(e.target.innerHTML)
        hilight.hilightElement(e)
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

    function submitProject() {
        const submitProjectButton = document.querySelector('#submit-project')
        submitProjectButton.addEventListener('click', submitForm)
    }

    function setup() {
        addProjectClickEvent()
        closeModalEventListener()
        submitProject()
    }

    return {setup}
})();

const initialPageLoad = (function() {
    navigation.setup()
    projectsTab.setup()
})();