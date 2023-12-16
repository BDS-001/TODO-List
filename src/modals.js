import { projects, tasks } from "./projects"
import { projectsTab } from ".";
import { currentProjectCache } from "./globals";

export const addProjectModal = (function() {
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

    function closeModalEventListener() {
        const closeButton = document.querySelector('.project-close-btn')
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

//WIP
export const addTaskModal = (function() {
    function openModal() {
        document.getElementById("modalOverlay").style.display = "block";
        document.getElementById("taskModal").style.display = "block";
    }
    
    function closeTaskModal() {
        document.getElementById("modalOverlay").style.display = "none";
        document.getElementById("taskModal").style.display = "none";
        clearForm()
    }
    
    function submitTaskForm() {
        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;
        
        const newTask = tasks.newTask(taskName, taskDescription, currentProjectCache) 
        closeTaskModal();
    }

    function closeModalEventListener() {
        const closeButton = document.querySelector('.task-close-btn')
        closeButton.addEventListener('click', closeTaskModal)
    }

    function submitTaskEventListener() {
        const submitTaskButton = document.querySelector('#submit-task')
        submitTaskButton.addEventListener('click', submitTaskForm)
    }

    function clearForm() {
        const inputs = document.querySelectorAll('.task-modal-data')
        console.log(inputs)
        inputs.forEach(function(formInput) {
            formInput.value = ''
        })
    }

    function setup() {
        closeModalEventListener()
        submitTaskEventListener()
        clearForm()
    }

    return { setup, openModal }
})();