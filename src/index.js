import { navigation } from "./content-control";
import { projects, tasks } from "./projects"
import { projectsContainer } from "./globals";

//module to control the add project modal
const addProjectModal = (function() {
    function openModal() {
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("projectModal").style.display = "block";
    }
    
    function closeModal() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("projectModal").style.display = "none";
        clearForm()
    }
    
    function submitProject() {
        let projectName = document.getElementById("projectName").value;
        let desc = document.getElementById("projectDescription").value;
        
        const newProject = projects.newProject(projectName, desc) 
        projectsTab.buildProject(newProject)
        closeModal();
    }
    
    // function buildProject(project) {
    //     const container = document.createElement('div')
    //     container.className = 'sidebar-element'
    
    //     const icon = document.createElement('i')
    //     icon.className = 'bi bi-dot'
    
    //     const projectName = document.createElement('a')
    //     projectName.innerHTML = project.name
    //     projectName.setAttribute('href', 'javascript:;')
    //     navigation.addNavigationClickEvent(projectName)
    //     projectName.dataset.title = project.name
    //     projectName.dataset.projectId = project.id
    
    //     container.append(icon)
    //     container.append(projectName)
    //     projectsContainer.append(container)
    // }

    function closeModalEventListener() {
        const closeButton = document.querySelector('.close-btn')
        closeButton.addEventListener('click', closeModal)
    }

    function submitProjectEventListener() {
        const submitProjectButton = document.querySelector('#submit-project')
        submitProjectButton.addEventListener('click', submitProject)
    }

    function clearForm() {
        const inputs = document.querySelectorAll('.modal-data')
        console.log(inputs)
        inputs.forEach(function(formInput) {
            formInput.value = ''
        })
    }

    function setup() {
        closeModalEventListener()
        submitProjectEventListener()
        clearForm()
    }

    return { openModal, setup}
})();

//module to setup the inbox tab
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

//module to setup projects tab
const projectsTab = (function() {
    function addProject(e) {
        e.preventDefault()
        addProjectModal.openModal()
    }

    function addProjectClickEvent() {
        const addProjectButton = document.querySelector('#add-project')
        addProjectButton.addEventListener('click', addProject)
    }

    function loadProjects() {
        const projectsList = Object.values(JSON.parse(localStorage.getItem('projects')))
        projectsList.forEach(proj => {
            buildProject(proj)
        });
    }

    function buildProject(project) {
        const container = document.createElement('div')
        container.className = 'sidebar-element'
    
        const icon = document.createElement('i')
        icon.className = 'bi bi-dot'
    
        const projectName = document.createElement('a')
        projectName.innerHTML = project.name
        projectName.setAttribute('href', 'javascript:;')
        navigation.addNavigationClickEvent(projectName)
        projectName.dataset.title = project.name
        projectName.dataset.projectId = project.id
    
        container.append(icon)
        container.append(projectName)
        projectsContainer.append(container)
    }

    function setup() {
        addProjectClickEvent()
        loadProjects()
    }

    return { setup, buildProject }
})();

//setup webpage on startup
const initialPageLoad = (function() {
    inboxTab.setup()
    projectsTab.setup()
    addProjectModal.setup()

    //localStorage.clear()
})();