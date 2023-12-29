(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{C:()=>y});const e=document.querySelector(".projects"),n=document.querySelector("#content");let o=null;function c(t){const e=new Date(t),n=("0"+e.getDate()).slice(-2),o=("0"+(e.getMonth()+1)).slice(-2);return`${e.getFullYear()}-${o}-${n}`}function a(t,e){const n=new Date(t),o=new Date(e).getTime()-n.getTime();return Math.ceil(o/864e5)}function r(t){t.reset()}function s(){return Math.floor(Math.random()*Date.now()).toString(16)+(new Date).getTime().toString(16)}const i=function(){if(!localStorage.getItem("projects")){const t={};e(JSON.stringify(t))}function t(){return JSON.parse(localStorage.getItem("projects"))}function e(t){localStorage.setItem("projects",JSON.stringify(t))}return{newProject:function(t,n){const o={name:t,desc:n,id:s(),tasks:[]},c=JSON.parse(localStorage.getItem("projects"));return c[o.id]=o,e(c),o},getCompletedTasks:function(t){return d.getTaskList().filter((e=>e.completed&&e.project==t))},getInProgressTasks:function(t){const e=d.getTaskList();if(e)return e.filter((e=>!e.completed&&e.project==t))},addTask:function(e,n,o,c,a){const r=t(),i=s(),l=d.newTask(i,n,o,e,c,a);return r[e].tasks.push(l.id),d.newTask(l),l},getAllProjectTasks:function(t){return d.getTaskList().filter((e=>e.project==t))},getProjectById:function(e){if(e)return t()[e]},deleteProject:function(n){const o=t();d.getTaskList().forEach((t=>{t.project===n&&d.deleteTask(t.id)})),delete o[n],e(o)},getProjects:t}}(),d=function(){function t(){return JSON.parse(localStorage.getItem("tasks"))}function e(t){localStorage.setItem("tasks",JSON.stringify(t))}return localStorage.getItem("tasks")||e({}),{markComplete:function(n){const o=t();o[n].completed=!0,e(o)},newTask:function(n,o,a,r,i){const d={id:s(),title:n,desc:o,date:c(Date.now()),project:a,completed:!1,dueDate:r,priorityLevel:i},l=t();return l[d.id]=d,e(l),d},getTaskList:function(){return Object.values(t())},findTaskById:function(e){return t()[e]},deleteTask:function(n){let o=t();delete o[n],e(o)},getTasks:t,updateTasks:e}}();function l(t,e){document.getElementById("modalOverlay").style.display=t,document.getElementById(e).style.display=t}function u(t,e){document.querySelector(t).addEventListener("click",e)}function p(t,e){document.querySelector(t).addEventListener("click",e)}const m=function(){const t=document.getElementById("projectForm");function e(){l("none","projectModal"),r(t)}function n(){let t=document.getElementById("projectName").value,n=document.getElementById("projectDescription").value;const o=i.newProject(t,n);y.buildProject(o),e()}return{openModal:function(){l("block","projectModal")},setup:function(){u(".project-close-btn",e),p("#submit-project",n),r(t)}}}(),g=function(){const t=document.getElementById("taskForm");function e(){l("none","taskModal"),r(t)}function n(){const t=document.getElementById("taskName").value,n=document.getElementById("taskDescription").value,c=document.getElementById("due-date").value,a=document.getElementById("priority-level").value;console.log("here"),d.newTask(t,n,o.dataset.projectId,c,a),k.getContent(o),e()}return{setup:function(){u(".task-close-btn",e),p("#submit-task",n),r(t)},openModal:function(){l("block","taskModal")}}}(),f=function(){function t(t){o&&(o.parentNode.style.backgroundColor="inherit"),t.parentNode.style.backgroundColor="var(--highlight-sidebar)",o=t}function e(e){e.preventDefault(),k.getContent(e.target),t(e.target)}return{changeView:e,addNavigationClickEvent:function(t){t.addEventListener("click",e)},highlightElement:t}}(),k=function(){function t(t){n.innerHTML="";const o=function(t){const e=document.createElement("div");return e.className="content-title",e.innerHTML=`<h1>${t}</h1>`,e}(t.dataset.title),r=function(t){const e=t.dataset.projectId;return e?i.getProjectById(e):null}(t);r?function(t,o,c){c.append(function(){const t=document.createElement("button");return t.id="add-task",t.textContent="Add Task",t.addEventListener("click",g.openModal),t}()),n.append(c),e(i.getAllProjectTasks(o.id))}(0,r,o):function(t,o){n.append(o),"all"===t.dataset.category?function(){const t=i.getProjects();Object.keys(i.getProjects()).forEach((function(o){const c=document.createElement("h2");c.innerHTML=`${t[o].name}`,n.appendChild(c),e(i.getAllProjectTasks(o))}))}():"today"===t.dataset.category?function(){const t=c(Date.now());e(d.getTaskList().filter((e=>e.dueDate===t)),!0)}():"upcoming"===t.dataset.category?function(){const t=c(Date.now());e(d.getTaskList().filter((e=>a(t,e.dueDate)<=7&&a(t,e.dueDate)>=0&&!e.completed)),!0)}():"inprogress"===t.dataset.category&&function(){const t=d.getTaskList().filter((t=>!t.completed));console.log(t),e(t,!0)}()}(t,o)}function e(t,e=!1){const o=document.createElement("div");if(o.className="tasks-container",e){const e=i.getProjects();t.forEach((t=>o.append(r(t,e[t.project]))))}else t.forEach((t=>o.append(r(t))));n.append(o)}function r(t,e=null){function n(t,e,n,o){const c=document.createElement(t);return c.className=e,c.textContent=n,o.appendChild(c),c}const o=document.createElement("div");o.className="task-card "+(t.completed?"completed":"");const c=n("div","meta-info","",o);if(n("p","date",`Date: ${t.date}`,c),n("p","status",t.completed?"Completed":"Incomplete",c),e&&n("h4","project-title",`Project: ${e.name}`,o),n("h3","title",t.title,o),n("p","description",t.desc,o),n("p","",`Due Date: ${t.dueDate}`,o),t.completed)n("p","",`Priority Level: ${t.priorityLevel}`,o);else{const e=n("button","btn remove-btn","Remove Task",o);e.dataset.taskId=t.id,e.addEventListener("click",l);const c=n("button","btn complete-btn","Complete Task",o);c.dataset.taskId=t.id,c.addEventListener("click",s);const a=n("div","","",o);n("span","","Priority Level: ",a);const r=document.createElement("select");r.className="priority-select",r.dataset.taskId=t.id,["low","medium","high"].forEach((e=>{const n=document.createElement("option");n.value=e,n.textContent=e,n.selected=t.priorityLevel===e,r.appendChild(n)})),a.appendChild(r),r.addEventListener("change",(t=>{const e=t.target.dataset.taskId,n=t.target.value,o=d.getTasks();o[e].priorityLevel=n,d.updateTasks(o)}))}return o}function s(e){d.markComplete(e.target.dataset.taskId),t(o)}function l(e){const n=e.target.dataset.taskId;d.deleteTask(n),t(o)}return{getContent:t}}(),j=function(){document.querySelectorAll(".inbox-category").forEach((function(t){const e=t.querySelector("a");f.addNavigationClickEvent(e)}))},y=function(){function t(t){t.preventDefault(),m.openModal()}function n(t){const n=document.createElement("div");n.className="sidebar-element";const o=document.createElement("i");o.className="bi bi-dot";const c=document.createElement("a");c.innerHTML=t.name,c.setAttribute("href","javascript:;"),f.addNavigationClickEvent(c),c.dataset.title=t.name,c.dataset.projectId=t.id;const a=document.createElement("button");a.className="delete-project-btn";const r=document.createElement("i");r.className="bi bi-trash",r.dataset.projectId=t.id,a.appendChild(r),a.onclick=function(t){console.log("delete project");const e=t.target.dataset.projectId;i.deleteProject(e),window.location.reload()},n.append(o),n.append(c),n.append(a),e.append(n)}return{setup:function(){document.querySelector("#add-project").addEventListener("click",t),Object.values(i.getProjects()).forEach((t=>{n(t)}))},buildProject:n}}();!function(){j(),y.setup(),m.setup(),g.setup();const t=document.getElementById("startpage");f.highlightElement(t),k.getContent(t)}()})();