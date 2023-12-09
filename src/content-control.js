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
        pageContent.innerHTML = target.dataset.title

        const currentProject = findProject(target)
        if (currentProject) {
            projectContent(target, currentProject);
        } else {
            inboxContent(target)
        }
    }

    function inboxContent(target) {
        //tmp
    }

    function projectContent(target, project) {
        addTaskButton()
        //tmp
        projects.addTask(project.id, 'first task', 'we need to finish this')
        projects.addTask(project.id, 'second task', 'call cleints and confirm something')
        getTasks(project)
    }

    function addTaskButton() {
        const addTask = document.createElement('button')
        addTask.id = 'add-task'
        addTask.innerHTML = 'Add Task'
        pageContent.append(addTask)
    }

    function getTasks(project) {
        const tasks = projects.getInProgressTasks(project.id);
        console.log(project)
        tasks.forEach(task => {
          const taskDiv = document.createElement('div');
          taskDiv.textContent = `Task: ${task.title}, Description: ${task.desc}, Date: ${task.date}, Completed: ${task.completed}`;
          pageContent.appendChild(taskDiv);
        });
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