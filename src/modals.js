import { projects, tasks } from "./projects"
import { projectsTab } from ".";
import { currentNavElement, clearForm } from "./globals";
import { contentFilter } from "./content-control";

function toggleModal(displayStyle, modalId) {
    document.getElementById("modalOverlay").style.display = displayStyle;
    document.getElementById(modalId).style.display = displayStyle;
}

function addCloseEventListener(closeButtonClass, closeModalFunction) {
    const closeButton = document.querySelector(closeButtonClass);
    closeButton.addEventListener('click', closeModalFunction);
}

function addSubmitEventListener(submitButtonId, submitFunction) {
    const submitButton = document.querySelector(submitButtonId);
    submitButton.addEventListener('click', submitFunction);
}

// Module to control the addProject form
export const addProjectModal = (function() {
    const projectForm = document.getElementById('projectForm');

    function openModal() {
        toggleModal("block", "projectModal");
    }

    function closeModal() {
        toggleModal("none", "projectModal");
        clearForm(projectForm);
    }

    function submitProject() {
        let projectName = document.getElementById("projectName").value;
        let desc = document.getElementById("projectDescription").value;
    
        const newProject = projects.newProject(projectName, desc) 
        projectsTab.buildProject(newProject)
        closeModal();
    }

    function setup() {
        addCloseEventListener('.project-close-btn', closeModal);
        addSubmitEventListener('#submit-project', submitProject);
        clearForm(projectForm);
    }

    return { openModal, setup };
})();

// Module that controls the addTaskModal
export const addTaskModal = (function() {
    const taskForm = document.getElementById('taskForm');

    function openModal() {
        toggleModal("block", "taskModal");
    }

    function closeTaskModal() {
        toggleModal("none", "taskModal");
        clearForm(taskForm);
    }

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

    function setup() {
        addCloseEventListener('.task-close-btn', closeTaskModal);
        addSubmitEventListener('#submit-task', submitTaskForm);
        clearForm(taskForm);
    }

    return { setup, openModal };
})();