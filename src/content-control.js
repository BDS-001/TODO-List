import { projects, tasks } from "./projects";
import { formatTimestamp, pageContent, currentNavElement } from "./globals";
import { addTaskModal } from "./modals";

export const navigation = (function() {
    function highlightElement(e) {
        if (currentNavElement) currentNavElement.parentNode.style.backgroundColor = 'inherit';
        e.target.parentNode.style.backgroundColor = 'var(--highlight-sidebar)';
        currentNavElement = e.target;
    }
    
    function changeView(e) {
        e.preventDefault();
        contentFilter.getContent(e.target);
        highlightElement(e);
    }

    function addNavigationClickEvent(element) {
        element.addEventListener('click', changeView);
    }

    return { changeView, addNavigationClickEvent };
})();

export const contentFilter = (function() {
    function getContent(target) {
        clearPageContent();
        const contentTitle = createContentTitle(target.dataset.title);
        const currentProject = findProject(target);

        if (currentProject) {
            displayProjectContent(target, currentProject, contentTitle);
        } else {
            displayInboxContent(target, contentTitle);
        }
    }

    function clearPageContent() {
        pageContent.innerHTML = '';
    }

    function createContentTitle(title) {
        const contentTitle = document.createElement('div');
        contentTitle.className = 'content-title';
        contentTitle.innerHTML = `<h1>${title}</h1>`;
        return contentTitle;
    }

    function displayProjectContent(target, project, contentTitle) {
        contentTitle.append(createAddTaskButton());
        pageContent.append(contentTitle);
        displayTasks(projects.getAllTasks(project.id));
    }

    function displayInboxContent(target, contentTitle) {
        pageContent.append(contentTitle);
        if (target.dataset.category === 'all') {

        } else if (target.dataset.category === 'today') {

        } else if (target.dataset.category === 'upcoming') {
            
        } else if (target.dataset.category === 'anytime') {
            
        } else if (target.dataset.category === 'archive') {
            
        }
    }

    function createAddTaskButton() {
        const addTaskButton = document.createElement('button');
        addTaskButton.id = 'add-task';
        addTaskButton.textContent = 'Add Task';
        addTaskButton.addEventListener('click', addTaskModal.openModal);
        return addTaskButton;
    }

    function displayTasks(tasks) {
        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'tasks-container';
        tasks.forEach(task => tasksContainer.append(buildTaskCard(task)));
        pageContent.append(tasksContainer);
    }

    function buildTaskCard(task, project = null) {
        // Helper function to create and append elements
        function createElement(type, className, content, parent) {
            const element = document.createElement(type);
            element.className = className;
            element.textContent = content;
            parent.appendChild(element);
            return element;
        }
    
        // Create a new div element for the card
        const card = document.createElement("div");
        card.className = `task-card ${task.completed ? 'completed' : ''}`;
    
        // Create and append meta info (date and status) in the top corners
        const metaInfoElement = createElement("div", "meta-info", "", card);
        createElement("p", "date", `Date: ${formatTimestamp(task.date)}`, metaInfoElement);
        createElement("p", "status", `${task.completed ? 'Completed' : 'Incomplete'}`, metaInfoElement);
    
        // Add project title if provided
        if (project) {
            createElement("h4", "project-title", `Project: ${project.title}`, card);
        }
    
        // Create and append other task details
        createElement("h3", "title", task.title, card);
        createElement("p", "description", task.desc, card);
        createElement("p", "", `Due Date: ${task.dueDate}`, card);
        createElement("p", "", `Priority Level: ${task.priorityLevel}`, card);
    
        // Create and append buttons if the task is not completed
        if (!task.completed) {
            const removeButton = createElement("button", "btn remove-btn", "Remove Task", card);
            removeButton.dataset.taskId = task.id;
            removeButton.addEventListener('click', deleteTask);
    
            const completeButton = createElement("button", "btn complete-btn", "Complete Task", card);
            completeButton.dataset.taskId = task.id;
            completeButton.addEventListener('click', completeTask);
        }
    
        return card;
    }

    function completeTask(e) {
        tasks.markComplete(e.target.dataset.taskId);
        getContent(currentNavElement);
    }

    function deleteTask(e) {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        const taskId = e.target.dataset.taskId
        delete tasks[taskId]
        localStorage.setItem('tasks', JSON.stringify(tasks))
        getContent(currentNavElement)
    }

    function findProject(target) {
        const targetId = target.dataset.projectId;
        return targetId ? projects.getProjectById(targetId) : null;
    }

    return { getContent };
})();