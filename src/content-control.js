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
        contentFilter.getContent(e.target.innerHTML)
        hilightElement(e)
    }

    function addNavigationClickEvent(element) {
        element.addEventListener('click', changeView)
    }

    return { changeView,addNavigationClickEvent }

 })();

 export const contentFilter = (function() {
    function getContent(view) {
        //tmp for testing
        pageContent.innerHTML = view
    }

    function getTasks(project) {
        const tasks = project.getInProgressTasks();
        tasks.forEach(task => {
          const taskDiv = document.createElement('div');
          taskDiv.textContent = `Task ID: ${task.id}, Description: ${task.description}, Date: ${task.date}, Completed: ${task.completed}`;
          contentDiv.appendChild(taskDiv);
        });
      }

      return { getContent }
 })();