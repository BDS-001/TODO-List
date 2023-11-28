import { Project, Task, projectsList } from "./projects"

export function openModal() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("myModal").style.display = "block";
}

export function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("myModal").style.display = "none";
}

export function submitForm() {
    let projectName = document.getElementById("projectName").value;
    let desc = document.getElementById("projectDescription").value;
    let sidebarProjects = document.querySelector(".projects");
    sidebarProjects.append(projectName)
    projectsList.push(new Project(projectName, desc))
    closeModal();
}