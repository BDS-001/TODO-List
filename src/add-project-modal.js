export function openModal() {
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("myModal").style.display = "block";
}

export function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("myModal").style.display = "none";
}

export function submitForm() {
    var projectName = document.getElementById("projectName").value;
    var additionalData = document.getElementById("additionalData").value;
    alert("Project Name: " + projectName + "\nAdditional Data: " + additionalData);
    closeModal();
}