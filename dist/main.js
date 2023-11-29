(()=>{"use strict";const e=[];class t{constructor(e,t){this.name=e,this.desc=t,this.tasks=[]}addTask(e,t,o,r){const s=this.generateUniqueId(),c=new n(s,e,t,o,r);return this.tasks.push(c),c}markTaskCompleted(e){const t=this.findTaskById(e);return!!t&&(t.markComplete(),!0)}generateUniqueId(){return Math.floor(Math.random()*Date.now()).toString(16)+(new Date).getTime().toString(16)}findTaskById(e){return this.tasks.find((t=>t.id===e))}getInProgressTasks(){return this.tasks.filter((e=>!e.completed))}getCompletedTasks(){return this.tasks.filter((e=>e.completed))}}class n{constructor(e,t,n,o){this.id=e,this.title=t,this.desc=n,this.date=Date.now(),this.project=o,this.completed=!1}markComplete(){this.completed=!0}}const o=document.querySelector(".projects");function r(){document.getElementById("modalOverlay").style.display="none",document.getElementById("myModal").style.display="none"}function s(){let n=document.getElementById("projectName").value,s=document.getElementById("projectDescription").value;!function(e){const t=document.createElement("div");t.className="sidebar-element";const n=document.createElement("i");n.className="bi bi-dot";const r=document.createElement("a");r.innerHTML=e,t.append(n),t.append(r),o.append(t)}(n),e.push(new t(n,s)),r()}const c=function(){let e=null;return{hilightElement:function(t){e&&(e.style.backgroundColor="inherit"),t.target.parentNode.style.backgroundColor="var(--hilight-sidebar)",e=t.target.parentNode}}}(),i=function(){function e(e){var t;e.preventDefault(),t=e.target.innerHTML,document.querySelector("#content").innerHTML=t,c.hilightElement(e)}return{setup:function(){document.querySelectorAll(".inbox-category").forEach((function(t){t.querySelector("a").addEventListener("click",e)}))}}}(),l=function(){function e(e){e.preventDefault(),document.getElementById("modalOverlay").style.display="block",document.getElementById("myModal").style.display="block"}return{setup:function(){document.querySelector("#add-project").addEventListener("click",e),document.querySelector(".close-btn").addEventListener("click",r),document.querySelector("#submit-project").addEventListener("click",s)}}}();i.setup(),l.setup()})();