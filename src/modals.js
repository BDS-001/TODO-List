import { projects, tasks } from "./projects"
import { projectsTab } from ".";
import { currentNavElement, clearForm } from "./globals";
import { contentFilter } from "./content-control";

//module to control the addproject form module
export const addProjectModal = (function() {

    const projectForm = document.getElementById('projectForm')

    //opens the module
    function openModal() {
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("projectModal").style.display = "block";
    }
    
    //closes the module
    function closeModal() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("projectModal").style.display = "none";
        clearForm(projectForm)
    }
    
    //project submition, save projec tinto local storage and close modal
    function submitProject() {
        let projectName = document.getElementById("projectName").value;
        let desc = document.getElementById("projectDescription").value;
        
        const newProject = projects.newProject(projectName, desc) 
        projectsTab.buildProject(newProject)
        closeModal();
    }

    //event listener for modal close button
    function closeModalEventListener() {
        const closeButton = document.querySelector('.project-close-btn')
        closeButton.addEventListener('click', closeModal)
    }

    //event listener for the submut button on project modal
    function submitProjectEventListener() {
        const submitProjectButton = document.querySelector('#submit-project')
        submitProjectButton.addEventListener('click', submitProject)
    }

    function setup() {
        closeModalEventListener()
        submitProjectEventListener()
        clearForm(projectForm)
    }

    return { openModal, setup}
})();

//module that controls the addTaskModal
export const addTaskModal = (function() {

    const taskForm = document.getElementById('taskForm');

    //open the task modal
    function openModal() {
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("taskModal").style.display = "block";
    }


    //close the task modal
    function closeTaskModal() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("taskModal").style.display = "none";
        clearForm(taskForm)
    }
    

    //submit new task form, save new task to local storage
    function submitTaskForm() {
        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;
        const dueDate = document.getElementById('due-date').value
        const priorityLevel = document.getElementById('priority-level').value
        console.log('here')
        const newTask = tasks.newTask(taskName, taskDescription, currentNavElement.dataset.projectId, dueDate, priorityLevel)
        contentFilter.getContent(currentNavElement)
        closeTaskModal();
    }


    //eventlisteener for modal close button
    function closeModalEventListener() {
        const closeButton = document.querySelector('.task-close-btn')
        closeButton.addEventListener('click', closeTaskModal)
    }

    //event listener for the submit button
    function submitTaskEventListener() {
        const submitTaskButton = document.querySelector('#submit-task')
        submitTaskButton.addEventListener('click', submitTaskForm)
    }

    function setup() {
        closeModalEventListener()
        submitTaskEventListener()
        clearForm(taskForm)
    }

    return { setup, openModal }
})();