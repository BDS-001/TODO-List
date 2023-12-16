(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(){return Math.floor(Math.random()*Date.now()).toString(16)+(new Date).getTime().toString(16)}e.d({},{C:()=>m});const n=function(){if(!localStorage.getItem("projects")){let e={};e=JSON.stringify(e),localStorage.setItem("projects",e)}return{newProject:function(e,n){const o={name:e,desc:n,id:t(),tasks:[]},a=JSON.parse(localStorage.getItem("projects"));return a[o.id]=o,localStorage.setItem("projects",JSON.stringify(a)),o},findTaskById:function(e){return JSON.parse(localStorage.getItem("tasks"))[e]},getCompletedTasks:function(e){return Object.values(JSON.parse(localStorage.getItem("tasks"))).filter((t=>t.completed&&t.project==e))},getInProgressTasks:function(e){const t=Object.values(JSON.parse(localStorage.getItem("tasks")));if(console.log("here",t),console.log("list",JSON.parse(localStorage.getItem("tasks"))),t)return t.filter((t=>!t.completed&&t.project==e))},addTask:function(e,n,a){const c=JSON.parse(localStorage.getItem("projects")),l=t(),s=o.newTask(l,n,a,e);return c[e].tasks.push(s.id),o.newTask(s),s}}}(),o=function(){if(!localStorage.getItem("tasks")){let e={};e=JSON.stringify(e),localStorage.setItem("tasks",e)}return{markComplete:function(e){const t=JSON.parse(localStorage.getItem("tasks"));t[e].completed=!0,localStorage.setItem("tasks",JSON.stringify(t))},newTask:function(e,n,o){const a={id:t(),title:e,desc:n,date:Date.now(),project:o,completed:!1},c=JSON.parse(localStorage.getItem("tasks"));return c[a.id]=a,localStorage.setItem("tasks",JSON.stringify(c)),a}}}(),a=document.querySelector(".projects"),c=document.querySelector("#content");let l=null;const s=function(){function e(){document.getElementById("modalOverlay").style.display="none",document.getElementById("projectModal").style.display="none",o()}function t(){let t=document.getElementById("projectName").value,o=document.getElementById("projectDescription").value;const a=n.newProject(t,o);m.buildProject(a),e()}function o(){const e=document.querySelectorAll(".modal-data");console.log(e),e.forEach((function(e){e.value=""}))}return{openModal:function(){document.getElementById("modalOverlay").style.display="block",document.getElementById("projectModal").style.display="block"},setup:function(){document.querySelector(".project-close-btn").addEventListener("click",e),document.querySelector("#submit-project").addEventListener("click",t),o()}}}(),r=function(){function e(){document.getElementById("modalOverlay").style.display="none",document.getElementById("taskModal").style.display="none",n()}function t(){const t=document.getElementById("taskName").value,n=document.getElementById("taskDescription").value;o.newTask(t,n,l.dataset.projectId),i.getContent(l),e()}function n(){const e=document.querySelectorAll(".task-modal-data");console.log(e),e.forEach((function(e){e.value=""}))}return{setup:function(){document.querySelector(".task-close-btn").addEventListener("click",e),document.querySelector("#submit-task").addEventListener("click",t),n()},openModal:function(){document.getElementById("modalOverlay").style.display="block",document.getElementById("taskModal").style.display="block"}}}(),d=function(){function e(e){e.preventDefault(),i.getContent(e.target),function(e){l&&(l.parentNode.style.backgroundColor="inherit"),e.target.parentNode.style.backgroundColor="var(--hilight-sidebar)",l=e.target}(e)}return{changeView:e,addNavigationClickEvent:function(t){t.addEventListener("click",e)}}}(),i=function(){function e(e){console.log(e.target.dataset.taskId)}function t(e){console.log(e.target.dataset.taskId)}return{getContent:function(o){c.innerHTML="";const a=document.createElement("div");a.className="content-title",a.innerHTML=`<h1 style="font-size: 50px; font-weight: bold; display: inline;">${o.dataset.title}</h1>`;const l=function(e){const t=e.dataset.projectId;if(t)return JSON.parse(localStorage.getItem("projects"))[t]}(o);l?function(o,a,l){l.append(function(e){const t=document.createElement("button");return t.id="add-task",t.innerHTML="Add Task",t.addEventListener("click",r.openModal),t}()),c.append(l),function(o){const a=n.getInProgressTasks(o.id);console.log(o);const l=document.createElement("div");l.className="tasks-container",a.forEach((n=>{l.append(function(n){const o=document.createElement("div");o.className="task-card",n.completed&&o.classList.add("completed");const a=document.createElement("div");a.className="meta-info";const c=document.createElement("p");c.className="date",c.textContent="Date: "+function(e){const t=new Date(e);return`${("0"+t.getDate()).slice(-2)}-${("0"+(t.getMonth()+1)).slice(-2)}-${t.getFullYear().toString().slice(-2)}`}(n.date),a.appendChild(c);const l=document.createElement("p");l.className="status",l.textContent=n.completed?"Completed":"Incomplete",a.appendChild(l),o.appendChild(a);const s=document.createElement("h3");s.className="title",s.textContent=n.title,o.appendChild(s);const r=document.createElement("p");r.className="description",r.textContent=n.desc,o.appendChild(r);const d=document.createElement("button");d.className="btn remove-btn",d.textContent="Remove Task",d.dataset.taskId=n.id,d.addEventListener("click",t),o.appendChild(d);const i=document.createElement("button");return i.className="btn complete-btn",i.textContent="Complete Task",i.dataset.taskId=n.id,i.addEventListener("click",e),o.appendChild(i),o}(n))})),c.append(l)}(a)}(0,l,a):c.append(a)}}}(),u=function(){document.querySelectorAll(".inbox-category").forEach((function(e){const t=e.querySelector("a");d.addNavigationClickEvent(t)}))},m=function(){function e(e){e.preventDefault(),s.openModal()}function t(e){const t=document.createElement("div");t.className="sidebar-element";const n=document.createElement("i");n.className="bi bi-dot";const o=document.createElement("a");o.innerHTML=e.name,o.setAttribute("href","javascript:;"),d.addNavigationClickEvent(o),o.dataset.title=e.name,o.dataset.projectId=e.id,t.append(n),t.append(o),a.append(t)}return{setup:function(){document.querySelector("#add-project").addEventListener("click",e),Object.values(JSON.parse(localStorage.getItem("projects"))).forEach((e=>{t(e)}))},buildProject:t}}();u(),m.setup(),s.setup(),r.setup()})();