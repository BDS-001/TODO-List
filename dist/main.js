(()=>{"use strict";const e=function(){let t=null;return{changeView:function(e){var n;e.preventDefault(),n=e.target.innerHTML,document.querySelector("#content").innerHTML=n,function(e){t&&(t.style.backgroundColor="inherit"),e.target.parentNode.style.backgroundColor="var(--hilight-sidebar)",t=e.target.parentNode}(e)},addNavigationClickEvent:function(t){t.addEventListener("click",e.changeView)}}}(),t=[];class n{constructor(e,t){this.name=e,this.desc=t,this.tasks=[]}addTask(e,t,n,c){const r=this.generateUniqueId(),a=new o(r,e,t,n,c);return this.tasks.push(a),a}markTaskCompleted(e){const t=this.findTaskById(e);return!!t&&(t.markComplete(),!0)}generateUniqueId(){return Math.floor(Math.random()*Date.now()).toString(16)+(new Date).getTime().toString(16)}findTaskById(e){return this.tasks.find((t=>t.id===e))}getInProgressTasks(){return this.tasks.filter((e=>!e.completed))}getCompletedTasks(){return this.tasks.filter((e=>e.completed))}}class o{constructor(e,t,n,o){this.id=e,this.title=t,this.desc=n,this.date=Date.now(),this.project=o,this.completed=!1}markComplete(){this.completed=!0}}const c=document.querySelector(".projects"),r=function(){function o(){document.getElementById("modalOverlay").style.display="none",document.getElementById("myModal").style.display="none"}function r(){let r=document.getElementById("projectName").value,a=document.getElementById("projectDescription").value;!function(t){const n=document.createElement("div");n.className="sidebar-element";const o=document.createElement("i");o.className="bi bi-dot";const r=document.createElement("a");r.innerHTML=t,r.setAttribute("href",""),e.addNavigationClickEvent(r),n.append(o),n.append(r),c.append(n)}(r),t.push(new n(r,a)),o(),function(){const e=document.querySelectorAll(".modal-data");console.log(e),e.forEach((function(e){e.value=""}))}()}return{openModal:function(){document.getElementById("modalOverlay").style.display="block",document.getElementById("myModal").style.display="block"},setup:function(){document.querySelector(".close-btn").addEventListener("click",o),document.querySelector("#submit-project").addEventListener("click",r)}}}(),a=function(){document.querySelectorAll(".inbox-category").forEach((function(t){const n=t.querySelector("a");e.addNavigationClickEvent(n)}))},i=function(){function e(e){e.preventDefault(),r.openModal()}return{setup:function(){document.querySelector("#add-project").addEventListener("click",e)}}}();a(),i.setup(),r.setup()})();