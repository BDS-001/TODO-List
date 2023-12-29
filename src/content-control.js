import { projects, tasks } from "./projects";
import { formatTimestamp, pageContent, currentNavElement, differenceInDays } from "./globals";
import { addTaskModal } from "./modals";

export const navigation = (function() {
    function highlightElement(target) {
        if (currentNavElement) currentNavElement.parentNode.style.backgroundColor = 'inherit';
        target.parentNode.style.backgroundColor = 'var(--highlight-sidebar)';
        currentNavElement = target;
    }
    
    function changeView(e) {
        e.preventDefault();
        contentFilter.getContent(e.target);
        highlightElement(e.target);
    }

    function addNavigationClickEvent(element) {
        element.addEventListener('click', changeView);
    }

    return { changeView, addNavigationClickEvent, highlightElement };
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
        displayTasks(projects.getAllProjectTasks(project.id));
    }

    function inboxToday() {
        const today = formatTimestamp(Date.now())
        const filterdTasks = tasks.getTaskList().filter(task => task.dueDate === today)
        displayTasks(filterdTasks, true)

    }

    function inboxUpcoming() {
        const today = formatTimestamp(Date.now())
        const filteredTasks = tasks.getTaskList().filter(task => differenceInDays(today, task.dueDate) <= 7 && differenceInDays(today, task.dueDate) >= 0  && !task.completed)
        displayTasks(filteredTasks, true)
    }

    function inboxAll() {
        const projectsList = projects.getProjects()
        const projectKeys = Object.keys(projects.getProjects())
        projectKeys.forEach(function(key){
            const title = document.createElement('h2')
            title.innerHTML = `${projectsList[key].name}`
            pageContent.appendChild(title)

            const projectTasks = projects.getAllProjectTasks(key)
            displayTasks(projectTasks)
        })
    }

    function inboxInprogress() {
        const filterdTasks = tasks.getTaskList().filter(task => !task.completed)
        displayTasks(filterdTasks, true)
    }

    function displayInboxContent(target, contentTitle) {
        pageContent.append(contentTitle);
        if (target.dataset.category === 'all') {
            inboxAll()
        } else if (target.dataset.category === 'today') {
            inboxToday()
        } else if (target.dataset.category === 'upcoming') {
            inboxUpcoming()
        } else if (target.dataset.category === 'inprogress') {
            inboxInprogress()
        }
    }

    function createAddTaskButton() {
        const addTaskButton = document.createElement('button');
        addTaskButton.id = 'add-task';
        addTaskButton.textContent = 'Add Task';
        addTaskButton.addEventListener('click', addTaskModal.openModal);
        return addTaskButton;
    }

    function displayTasks(tasks, projectTitle = false) {
        const tasksContainer = document.createElement('div');
        tasksContainer.className = 'tasks-container';

        if (projectTitle) {
            const projectList = projects.getProjects()
            tasks.forEach(task => tasksContainer.append(buildTaskCard(task, projectList[task.project])));
        } else {
            tasks.forEach(task => tasksContainer.append(buildTaskCard(task)));
        }
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
        createElement("p", "date", `Date: ${task.date}`, metaInfoElement);
        createElement("p", "status", `${task.completed ? 'Completed' : 'Incomplete'}`, metaInfoElement);
    
        // Add project title if provided
        if (project) {
            createElement("h4", "project-title", `Project: ${project.name}`, card);
        }
    
        // Create and append other task details
        createElement("h3", "title", task.title, card);
        createElement("p", "description", task.desc, card);
        createElement("p", "", `Due Date: ${task.dueDate}`, card);
    
        // Create and append buttons if the task is not completed
        if (!task.completed) {
            const removeButton = createElement("button", "btn remove-btn", "Remove Task", card);
            removeButton.dataset.taskId = task.id;
            removeButton.addEventListener('click', deleteTask);
    
            const completeButton = createElement("button", "btn complete-btn", "Complete Task", card);
            completeButton.dataset.taskId = task.id;
            completeButton.addEventListener('click', completeTask);

            // Create and append priority level dropdown
            const priorityElement = createElement("div", "", "", card);
            createElement("span", "", "Priority Level: ", priorityElement);

            const prioritySelect = document.createElement("select");
            prioritySelect.className = "priority-select";
            prioritySelect.dataset.taskId = task.id;

            ["low", "medium", "high"].forEach(level => {
                const option = document.createElement("option");
                option.value = level;
                option.textContent = level;
                option.selected = task.priorityLevel === level;
                prioritySelect.appendChild(option);
            });
            priorityElement.appendChild(prioritySelect);

            // Event listener for priority level change
            prioritySelect.addEventListener('change', (e) => {
                const taskId = e.target.dataset.taskId;
                const newPriority = e.target.value;
                
                const taskList = tasks.getTasks()
                taskList[taskId].priorityLevel = newPriority
                tasks.updateTasks(taskList)
            });
        } else {
            createElement("p", "", `Priority Level: ${task.priorityLevel}`, card);
        }
    
        return card;
    }

    function completeTask(e) {
        tasks.markComplete(e.target.dataset.taskId);
        getContent(currentNavElement);
    }

    function deleteTask(e) {
        const taskId = e.target.dataset.taskId
        tasks.deleteTask(taskId)
        getContent(currentNavElement)
    }

    function findProject(target) {
        const targetId = target.dataset.projectId;
        return targetId ? projects.getProjectById(targetId) : null;
    }

    return { getContent };
})();