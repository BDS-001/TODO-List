import { openModal, closeModal, submitForm } from "./add-project-modal"
import { navigation } from "./navigation";

const inboxTab = (function() {

    function setup() {
        const inbox = document.querySelectorAll('.inbox-category')
        inbox.forEach(function(menu) {
            const link = menu.querySelector('a')
            navigation.addNavigationClickEvent(link)
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
    inboxTab.setup()
    projectsTab.setup()
})();