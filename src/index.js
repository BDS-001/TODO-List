import { contentFilter, navigation } from "./content-control";
import { projectsContainer } from "./globals";
import { addProjectModal, addTaskModal } from "./modals.js" 
import { projects } from "./projects.js";



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
export const projectsTab = (function() {
    function addProject(e) {
        e.preventDefault()
        addProjectModal.openModal()
    }

    // add clickevent to the + button
    function addProjectClickEvent() {
        const addProjectButton = document.querySelector('#add-project')
        addProjectButton.addEventListener('click', addProject)
    }

    //loads all the projects into the navbar
    function loadProjects() {
        const projectsList = Object.values(projects.getProjects())
        projectsList.forEach(proj => {
            buildProject(proj)
        });
    }

    // builds the nav entry for each project
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

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-project-btn';
        deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
        deleteButton.dataset.projectId = project.id;
        deleteButton.onclick = function() {
            // Add your delete logic here
            console.log('delete project')
        };
    
        container.append(icon)
        container.append(projectName)
        container.append(deleteButton)
        projectsContainer.append(container)
    }

    //setup function for initial page load
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
    addTaskModal.setup()

    const startPage = document.getElementById("startpage");
    navigation.highlightElement(startPage)
    contentFilter.getContent(startPage)
})();

