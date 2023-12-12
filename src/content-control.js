import { projects, tasks } from "./projects";
import { pageContent } from "./globals";

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
        tasks.forEach(task => {
          buildTask(task)
        });
      }

      function buildTask(task) {
        // Create a new div element for the card
        const card = document.createElement("div");
        card.className = "task-card";

        if (task.completed) {
        card.classList.add("completed");
        }

        // Create HTML content for the card
        card.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Date: ${task.date}</p>
        <p>Status: ${task.completed ? 'Completed' : 'Incomplete'}</p>
        `;

        // Append the card to the body of the document
        pageContent.appendChild(card);
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