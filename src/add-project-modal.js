import { Project, Task, projectsList } from "./projects"
import { projectsContainer } from "./globals";

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
    
    buildProject(projectName)
    projectsList.push(new Project(projectName, desc))
    closeModal();
}

function buildProject(name) {
    const container = document.createElement('div')
    container.className = 'sidebar-element'

    const icon = document.createElement('i')
    icon.className = 'bi bi-dot'

    const projectName = document.createElement('a')
    projectName.innerHTML = name

    container.append(icon)
    container.append(projectName)

    projectsContainer.append(container)
}