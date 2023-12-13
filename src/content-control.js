import { projects, tasks } from "./projects";
import { formatTimestamp, pageContent } from "./globals";

export const navigation = (function() {
    let cache = null

    function hilightElement(e) {
        if (cache) cache.style.backgroundColor = 'inherit';
        e.target.parentNode.style.backgroundColor = 'var(--hilight-sidebar)';
        cache = e.target.parentNode;
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
        //tmp
    }

    function projectContent(target, project, contentTitle) {
        addTaskButton(contentTitle)
        //tmp
        //projects.addTask(project.id, 'first task', 'we need to finish this')
        //projects.addTask(project.id, 'second task', 'call cleints and confirm something')
        getTasks(project)
    }

    function addTaskButton(contentTitle) {
        const addTask = document.createElement('button')
        addTask.id = 'add-task'
        addTask.innerHTML = 'Add Task'
        contentTitle.append(addTask)
        pageContent.append(contentTitle)
    }

    function getTasks(project) {
        const tasks = projects.getInProgressTasks(project.id);
        console.log(project)

        const tasksContainer = document.createElement('div')
        tasksContainer.className = 'tasks-container'

        tasks.forEach(task => {
          tasksContainer.append(buildTask(task))
        });

        pageContent.append(tasksContainer)
      }

      function buildTask(task) {
        // Create a new div element for the card
        const card = document.createElement("div");
        card.className = "task-card";

        // Check if the task is completed and add a class accordingly
        if (task.completed) {
        card.classList.add("completed");
        }

        // Create and append meta info (date and status) in the top corners
        const metaInfoElement = document.createElement("div");
        metaInfoElement.className = "meta-info";

        const dateElement = document.createElement("p");
        dateElement.className = "date";
        dateElement.textContent = "Date: " + formatTimestamp(task.date);
        metaInfoElement.appendChild(dateElement);

        const statusElement = document.createElement("p");
        statusElement.className = "status";
        statusElement.textContent = (task.completed ? 'Completed' : 'Incomplete');
        metaInfoElement.appendChild(statusElement);

        card.appendChild(metaInfoElement);

        // Create and append HTML content for the card
        const titleElement = document.createElement("h3");
        titleElement.className = "title";
        titleElement.textContent = task.title;
        card.appendChild(titleElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.className = "description";
        descriptionElement.textContent = task.desc;
        card.appendChild(descriptionElement);

        // Create and append "Remove Task" button
        const removeButton = document.createElement("button");
        removeButton.className = "btn remove-btn";
        removeButton.textContent = "Remove Task";
        removeButton.dataset.taskId = task.id;
        removeButton.addEventListener('click', deleteTask)
        card.appendChild(removeButton);

        // Create and append "Complete Task" button
        const completeButton = document.createElement("button");
        completeButton.className = "btn complete-btn";
        completeButton.textContent = "Complete Task";
        completeButton.dataset.taskId = task.id;
        completeButton.addEventListener('click', completeTask)
        card.appendChild(completeButton);

        // Append the card to the body of the document
        return card
      }

      function completeTask(e) {
        console.log(e.target.dataset.taskId)
      }

      function deleteTask(e) {
        console.log(e.target.dataset.taskId)
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