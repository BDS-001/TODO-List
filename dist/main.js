(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{C:()=>i});const t=function(){if(!localStorage.getItem("projects")){let e={};e=JSON.stringify(e),localStorage.setItem("projects",e)}function e(){return Math.floor(Math.random()*Date.now()).toString(16)+(new Date).getTime().toString(16)}return{newProject:function(t,n){const o={name:t,desc:n,id:e(),tasks:[]},a=JSON.parse(localStorage.getItem("projects"));return a[o.id]=o,localStorage.setItem("projects",JSON.stringify(a)),o},findTaskById:function(e){return JSON.parse(localStorage.getItem("tasks"))[e]},getCompletedTasks:function(e){return Object.values(JSON.parse(localStorage.getItem("tasks"))).filter((t=>t.completed&&t.project==e))},getInProgressTasks:function(e){const t=Object.values(JSON.parse(localStorage.getItem("tasks")));if(console.log("here",t),console.log("list",JSON.parse(localStorage.getItem("tasks"))),t)return t.filter((t=>!t.completed&&t.project==e))},generateUniqueId:e,addTask:function(t,o,a){const c=JSON.parse(localStorage.getItem("projects")),l=e(),s=n.newTask(l,o,a,t);return c[t].tasks.push(s.id),n.newTask(s),s}}}(),n=function(){if(!localStorage.getItem("tasks")){let e={};e=JSON.stringify(e),localStorage.setItem("tasks",e)}return{markComplete:function(e){const t=JSON.parse(localStorage.getItem("tasks"));t[e].completed=!0,localStorage.setItem("tasks",JSON.stringify(t))},newTask:function(e,t,n,o){const a={id:e,title:t,desc:n,date:Date.now(),project:o,completed:!1},c=JSON.parse(localStorage.getItem("tasks"));return c[a.id]=a,localStorage.setItem("tasks",JSON.stringify(c)),a}}}(),o=document.querySelector(".projects"),a=document.querySelector("#content"),c=function(){function e(){document.getElementById("modalOverlay").style.display="none",document.getElementById("projectModal").style.display="none",o()}function n(){let n=document.getElementById("projectName").value,o=document.getElementById("projectDescription").value;const a=t.newProject(n,o);i.buildProject(a),e()}function o(){const e=document.querySelectorAll(".modal-data");console.log(e),e.forEach((function(e){e.value=""}))}return{openModal:function(){document.getElementById("modalOverlay").style.display="block",document.getElementById("projectModal").style.display="block"},setup:function(){document.querySelector(".project-close-btn").addEventListener("click",e),document.querySelector("#submit-project").addEventListener("click",n),o()}}}(),l=function(){function e(){document.getElementById("modalOverlay").style.display="none",document.getElementById("taskModal").style.display="none",o()}function t(){let t=document.getElementById("taskName").value,o=document.getElementById("taskDescription").value;n.newTask(t,o),e()}function o(){const e=document.querySelectorAll(".task-modal-data");console.log(e),e.forEach((function(e){e.value=""}))}return{setup:function(){document.querySelector(".task-close-btn").addEventListener("click",e),document.querySelector("#submit-task").addEventListener("click",t),o()},openModal:function(){document.getElementById("modalOverlay").style.display="block",document.getElementById("taskModal").style.display="block"}}}(),s=function(){let e=null;function t(t){t.preventDefault(),r.getContent(t.target),function(t){e&&(e.style.backgroundColor="inherit"),t.target.parentNode.style.backgroundColor="var(--hilight-sidebar)",e=t.target.parentNode}(t)}return{changeView:t,addNavigationClickEvent:function(e){e.addEventListener("click",t)}}}(),r=function(){function e(e){console.log(e.target.dataset.taskId)}function n(e){console.log(e.target.dataset.taskId)}return{getContent:function(o){a.innerHTML="";const c=document.createElement("div");c.className="content-title",c.innerHTML=`<h1 style="font-size: 50px; font-weight: bold; display: inline;">${o.dataset.title}</h1>`;const s=function(e){const t=e.dataset.projectId;if(t)return JSON.parse(localStorage.getItem("projects"))[t]}(o);s?function(o,c,s){(function(e){const t=document.createElement("button");t.id="add-task",t.innerHTML="Add Task",t.addEventListener("click",l.openModal),e.append(t),a.append(e)})(s),function(o){const c=t.getInProgressTasks(o.id);console.log(o);const l=document.createElement("div");l.className="tasks-container",c.forEach((t=>{l.append(function(t){const o=document.createElement("div");o.className="task-card",t.completed&&o.classList.add("completed");const a=document.createElement("div");a.className="meta-info";const c=document.createElement("p");c.className="date",c.textContent="Date: "+function(e){const t=new Date(e);return`${("0"+t.getDate()).slice(-2)}-${("0"+(t.getMonth()+1)).slice(-2)}-${t.getFullYear().toString().slice(-2)}`}(t.date),a.appendChild(c);const l=document.createElement("p");l.className="status",l.textContent=t.completed?"Completed":"Incomplete",a.appendChild(l),o.appendChild(a);const s=document.createElement("h3");s.className="title",s.textContent=t.title,o.appendChild(s);const r=document.createElement("p");r.className="description",r.textContent=t.desc,o.appendChild(r);const d=document.createElement("button");d.className="btn remove-btn",d.textContent="Remove Task",d.dataset.taskId=t.id,d.addEventListener("click",n),o.appendChild(d);const i=document.createElement("button");return i.className="btn complete-btn",i.textContent="Complete Task",i.dataset.taskId=t.id,i.addEventListener("click",e),o.appendChild(i),o}(t))})),a.append(l)}(c)}(0,s,c):a.append(c)}}}(),d=function(){document.querySelectorAll(".inbox-category").forEach((function(e){const t=e.querySelector("a");s.addNavigationClickEvent(t)}))},i=function(){function e(e){e.preventDefault(),c.openModal()}function t(e){const t=document.createElement("div");t.className="sidebar-element";const n=document.createElement("i");n.className="bi bi-dot";const a=document.createElement("a");a.innerHTML=e.name,a.setAttribute("href","javascript:;"),s.addNavigationClickEvent(a),a.dataset.title=e.name,a.dataset.projectId=e.id,t.append(n),t.append(a),o.append(t)}return{setup:function(){document.querySelector("#add-project").addEventListener("click",e),Object.values(JSON.parse(localStorage.getItem("projects"))).forEach((e=>{t(e)}))},buildProject:t}}();d(),i.setup(),c.setup(),l.setup()})();