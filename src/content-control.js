import { projectsList } from "./projects";
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
        pageContent.innerHTML = target.innerHTML
        const currentProject = findProject(target)
        if (currentProject) getTasks(currentProject);
    }

    function getTasks(project) {
        const tasks = project.getInProgressTasks();
        tasks.forEach(task => {
          const taskDiv = document.createElement('div');
          taskDiv.textContent = `Task ID: ${task.id}, Description: ${task.description}, Date: ${task.date}, Completed: ${task.completed}`;
          pageContent.appendChild(taskDiv);
        });
      }

      function findProject(target) {
        const targetId = target.dataset.projectId
        if (targetId) {
            return projectsList.filter(project => project.id === targetId)[0]
        }
      }

      return { getContent }
 })();