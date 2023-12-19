import { projects, tasks } from "./projects";
import { formatTimestamp, pageContent, currentNavElement } from "./globals";
import { addTaskModal } from "./modals";

export const navigation = (function() {

    function hilightElement(e) {
        if (currentNavElement) currentNavElement.parentNode.style.backgroundColor = 'inherit';
        e.target.parentNode.style.backgroundColor = 'var(--hilight-sidebar)';
        currentNavElement = e.target;
    }
    
    function changeView(e) {
        e.preventDefault()
        contentFilter.getContent(e.target)
        hilightElement(e)
    }

    function addNavigationClickEvent(element) {
        element.addEventListener('click', changeView)
    }

    return { changeView,addNavigationClickEvent }

 })();

export const contentFilter = (function() {
    function getContent(target) {
        pageContent.innerHTML = ''

        const contentTitle = document.createElement('div');
        contentTitle.className = 'content-title'
        contentTitle.innerHTML = `<h1 style="font-size: 50px; font-weight: bold; display: inline;">${target.dataset.title}</h1>`;

        const currentProject = findProject(target)
        if (currentProject) {
            projectContent(target, currentProject, contentTitle);
        } else {
            pageContent.append(contentTitle)
            inboxContent(target)
        }
    }

    function inboxContent(target) {
        if (target.dataset.category === 'all') {
            
        } else if (target.dataset.category === 'today') {

        } else if (target.dataset.category === 'upcoming') {
            
        } else if (target.dataset.category === 'anytime') {
            
        } else if (target.dataset.category === 'archive') {
            
        }
    }

    function projectContent(target, project, contentTitle) {
        contentTitle.append(addTaskButton(project))
        pageContent.append(contentTitle)
        const tasks = projects.getAllTasks(project.id);
        pageContent.append(getTasks(tasks))
    }

    function addTaskButton(project) {
        const addTask = document.createElement('button')
        addTask.id = 'add-task'
        addTask.innerHTML = 'Add Task'
        addTask.addEventListener('click', addTaskModal.openModal)
        return addTask
    }

    function getTasks(tasks) {
        const tasksContainer = document.createElement('div')
        tasksContainer.className = 'tasks-container'

        tasks.forEach(task => {
          tasksContainer.append(buildTask(task))
        });

        return (tasksContainer)
      }

      function buildTask(task, project = null) {
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
        tasks.markComplete(e.target.dataset.taskId)
        getContent(currentNavElement)
      }

      function deleteTask(e) {
        let tasks = JSON.parse(localStorage.getItem('tasks'))
        const taskId = e.target.dataset.taskId
        delete tasks[taskId]
        localStorage.setItem('tasks', JSON.stringify(tasks))
        getContent(currentNavElement)
      }

      function findProject(target) {
        const targetId = target.dataset.projectId
        if (targetId) {
            const projectsList = JSON.parse(localStorage.getItem('projects'))
            return projectsList[targetId]
        }
      }

      return { getContent }
 })();