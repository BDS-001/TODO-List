import { navigation } from "./navigation";
import { Project, Task, projectsList } from "./projects"
import { projectsContainer } from "./globals";


const addProjectModal = (function() {
    function openModal() {
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("myModal").style.display = "block";
    }
    
    function closeModal() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("myModal").style.display = "none";
    }
    
    function submitForm() {
        let projectName = document.getElementById("projectName").value;
        let desc = document.getElementById("projectDescription").value;
        
        buildProject(projectName)
        projectsList.push(new Project(projectName, desc))
        closeModal();
    }
    
    function buildProject(name) {
        const container = document.createElement('div')
        container.className = 'sidebar-element'
    
        const icon = document.createElement('i')
        icon.className = 'bi bi-dot'
    
        const projectName = document.createElement('a')
        projectName.innerHTML = name
        projectName.setAttribute('href', '')
        navigation.addNavigationClickEvent(projectName)
    
        container.append(icon)
        container.append(projectName)
    
        projectsContainer.append(container)
    }

    return { openModal, closeModal, submitForm }
})()


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
        addProjectModal.openModal()
    }

    function addProjectClickEvent() {
        const addProjectButton = document.querySelector('#add-project')
        addProjectButton.addEventListener('click', addProject)
    }
    
    function closeModalEventListener() {
        const closeButton = document.querySelector('.close-btn')
        closeButton.addEventListener('click', addProjectModal.closeModal)
    }

    function submitProject() {
        const submitProjectButton = document.querySelector('#submit-project')
        submitProjectButton.addEventListener('click', addProjectModal.submitForm)
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