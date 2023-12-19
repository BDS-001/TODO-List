(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};function e(){return Math.floor(Math.random()*Date.now()).toString(16)+(new Date).getTime().toString(16)}t.d({},{C:()=>k});const n=function(){if(!localStorage.getItem("projects")){let t={};t=JSON.stringify(t),localStorage.setItem("projects",t)}return{newProject:function(t,n){const o={name:t,desc:n,id:e(),tasks:[]},a=JSON.parse(localStorage.getItem("projects"));return a[o.id]=o,localStorage.setItem("projects",JSON.stringify(a)),o},findTaskById:function(t){return JSON.parse(localStorage.getItem("tasks"))[t]},getCompletedTasks:function(t){return Object.values(JSON.parse(localStorage.getItem("tasks"))).filter((e=>e.completed&&e.project==t))},getInProgressTasks:function(t){const e=Object.values(JSON.parse(localStorage.getItem("tasks")));if(e)return e.filter((e=>!e.completed&&e.project==t))},addTask:function(t,n,a,c,r){const s=JSON.parse(localStorage.getItem("projects")),l=e(),i=o.newTask(l,n,a,t,c,r);return s[t].tasks.push(i.id),o.newTask(i),i},getAllTasks:function(t){return Object.values(JSON.parse(localStorage.getItem("tasks"))).filter((e=>e.project==t))}}}(),o=function(){if(!localStorage.getItem("tasks")){let t={};t=JSON.stringify(t),localStorage.setItem("tasks",t)}return{markComplete:function(t){const e=JSON.parse(localStorage.getItem("tasks"));e[t].completed=!0,localStorage.setItem("tasks",JSON.stringify(e))},newTask:function(t,n,o,a,c){const r={id:e(),title:t,desc:n,date:Date.now(),project:o,completed:!1,dueDate:a,priorityLevel:c},s=JSON.parse(localStorage.getItem("tasks"));return s[r.id]=r,localStorage.setItem("tasks",JSON.stringify(s)),r}}}(),a=document.querySelector(".projects"),c=document.querySelector("#content");let r=null;function s(t){t.reset()}function l(t,e){document.getElementById("modalOverlay").style.display=t,document.getElementById(e).style.display=t}function i(t,e){document.querySelector(t).addEventListener("click",e)}function d(t,e){document.querySelector(t).addEventListener("click",e)}const u=function(){const t=document.getElementById("projectForm");function e(){l("none","projectModal"),s(t)}function o(){let t=document.getElementById("projectName").value,o=document.getElementById("projectDescription").value;const a=n.newProject(t,o);k.buildProject(a),e()}return{openModal:function(){l("block","projectModal")},setup:function(){i(".project-close-btn",e),d("#submit-project",o),s(t)}}}(),p=function(){const t=document.getElementById("taskForm");function e(){l("none","taskModal"),s(t)}function n(){const t=document.getElementById("taskName").value,n=document.getElementById("taskDescription").value,a=document.getElementById("due-date").value,c=document.getElementById("priority-level").value;console.log("here"),o.newTask(t,n,r.dataset.projectId,a,c),g.getContent(r),e()}return{setup:function(){i(".task-close-btn",e),d("#submit-task",n),s(t)},openModal:function(){l("block","taskModal")}}}(),m=function(){function t(t){t.preventDefault(),g.getContent(t.target),function(t){r&&(r.parentNode.style.backgroundColor="inherit"),t.target.parentNode.style.backgroundColor="var(--hilight-sidebar)",r=t.target}(t)}return{changeView:t,addNavigationClickEvent:function(e){e.addEventListener("click",t)}}}(),g=function(){function t(t){c.innerHTML="";const o=document.createElement("div");o.className="content-title",o.innerHTML=`<h1 style="font-size: 50px; font-weight: bold; display: inline;">${t.dataset.title}</h1>`;const r=function(t){const e=t.dataset.projectId;if(e)return JSON.parse(localStorage.getItem("projects"))[e]}(t);r?function(t,o,r){r.append(function(t){const e=document.createElement("button");return e.id="add-task",e.innerHTML="Add Task",e.addEventListener("click",p.openModal),e}()),c.append(r);const s=n.getAllTasks(o.id);c.append(function(t){const n=document.createElement("div");return n.className="tasks-container",t.forEach((t=>{n.append(function(t,n=null){function o(t,e,n,o){const a=document.createElement(t);return a.className=e,a.textContent=n,o.appendChild(a),a}const c=document.createElement("div");c.className="task-card "+(t.completed?"completed":"");const r=o("div","meta-info","",c);if(o("p","date",`Date: ${function(t){const e=new Date(t),n=("0"+e.getDate()).slice(-2),o=("0"+(e.getMonth()+1)).slice(-2);return`${e.getFullYear().toString().slice(-2)}-${o}-${n}`}(t.date)}`,r),o("p","status",t.completed?"Completed":"Incomplete",r),n&&o("h4","project-title",`Project: ${n.title}`,c),o("h3","title",t.title,c),o("p","description",t.desc,c),o("p","",`Due Date: ${t.dueDate}`,c),o("p","",`Priority Level: ${t.priorityLevel}`,c),!t.completed){const n=o("button","btn remove-btn","Remove Task",c);n.dataset.taskId=t.id,n.addEventListener("click",a);const r=o("button","btn complete-btn","Complete Task",c);r.dataset.taskId=t.id,r.addEventListener("click",e)}return c}(t))})),n}(s))}(0,r,o):(c.append(o),function(t){"all"===t.dataset.category||"today"===t.dataset.category||"upcoming"===t.dataset.category||"anytime"===t.dataset.category||t.dataset.category}(t))}function e(e){o.markComplete(e.target.dataset.taskId),t(r)}function a(e){let n=JSON.parse(localStorage.getItem("tasks"));delete n[e.target.dataset.taskId],localStorage.setItem("tasks",JSON.stringify(n)),t(r)}return{getContent:t}}(),f=function(){document.querySelectorAll(".inbox-category").forEach((function(t){const e=t.querySelector("a");m.addNavigationClickEvent(e)}))},k=function(){function t(t){t.preventDefault(),u.openModal()}function e(t){const e=document.createElement("div");e.className="sidebar-element";const n=document.createElement("i");n.className="bi bi-dot";const o=document.createElement("a");o.innerHTML=t.name,o.setAttribute("href","javascript:;"),m.addNavigationClickEvent(o),o.dataset.title=t.name,o.dataset.projectId=t.id,e.append(n),e.append(o),a.append(e)}return{setup:function(){document.querySelector("#add-project").addEventListener("click",t),Object.values(JSON.parse(localStorage.getItem("projects"))).forEach((t=>{e(t)}))},buildProject:e}}();f(),k.setup(),u.setup(),p.setup()})();