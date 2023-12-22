import { formatTimestamp } from "./globals";

export function generateUniqueId() {
    // Generate a random number and convert it to a hexadecimal string
    const randomPart = Math.floor(Math.random() * Date.now()).toString(16);

    // Use the current timestamp to ensure uniqueness
    const timestampPart = new Date().getTime().toString(16);

    // Concatenate the random and timestamp parts
    const uniqueId = randomPart + timestampPart;

    return uniqueId;
}

//project functions
export const projects = (function() {
  if (!localStorage.getItem('projects')) {
      let newProjectsList = {}
      newProjectsList = JSON.stringify(newProjectsList)
      localStorage.setItem('projects', newProjectsList)
  }

  function newProject(name, desc) {
      const project = {
        'name': name,
        'desc': desc,
        'id': generateUniqueId(),
        'tasks': []
      }

      const projectList = JSON.parse(localStorage.getItem('projects'))
      projectList[project.id] = project
      localStorage.setItem('projects', JSON.stringify(projectList))

      return project
  }

  function addTask(projectId, title, desc, dueDate, priorityLevel) {
      const projectList = JSON.parse(localStorage.getItem('projects'))

      const taskId = generateUniqueId();
      const task = tasks.newTask(taskId, title, desc, projectId, dueDate, priorityLevel);
      projectList[projectId].tasks.push(task.id);
      tasks.newTask(task)
      return task;
  }

  function getProjectById(targetId) {
    if (targetId) {
        const projectsList = JSON.parse(localStorage.getItem('projects'))
        return projectsList[targetId]
    }
  }
  
  function getInProgressTasks(projectId) {
      const tasksList = Object.values(JSON.parse(localStorage.getItem('tasks')))
      if (tasksList) {
        return tasksList.filter(task => !task.completed && task.project == projectId);
      }
  }
  
  function getCompletedTasks(projectId) {
      const tasksList = Object.values(JSON.parse(localStorage.getItem('tasks')))
      return tasksList.filter(task => task.completed && task.project == projectId);
  }

  function getAllTasks(projectId) {
    const tasksList = Object.values(JSON.parse(localStorage.getItem('tasks')))
    return tasksList.filter(task => task.project == projectId);
  }

  function deleteProject(projectId) {
    const projectsList = JSON.parse(localStorage.getItem('projects'))
    const tasksList = tasks.getAllTasks()


  }

  return { newProject, getCompletedTasks, getInProgressTasks, addTask, getAllTasks, getProjectById, deleteProject }
})();

export const tasks = (function() {
  if (!localStorage.getItem('tasks')) {
      let newTasksList = {}
      updateTasks(newTasksList)
  }

  function markComplete(taskId) {
      const taskList = getTasks()
      taskList[taskId].completed = true
      updateTasks(taskList)
  }

  function newTask(title, desc, projectId, dueDate, priorityLevel) {
    const task = {
      'id': generateUniqueId(),
      'title': title,
      'desc': desc,
      'date': formatTimestamp(Date.now()),
      'project': projectId,
      'completed': false,
      'dueDate': dueDate,
      'priorityLevel': priorityLevel
  }
      const taskList = getTasks()
      taskList[task.id] = task
      updateTasks(taskList)

      return task
  }

  function getAllTasks() {
      return Object.values(getTasks())
  }

  function findTaskById(taskId) {
    const tasksList = getTasks()
    return tasksList[taskId];
  }

  function deleteTask(taskId) {
    let taskList = getTasks()
    delete taskList[taskId]
    updateTasks(taskList)
  }

  function getTasks() {
    return JSON.parse(localStorage.getItem('tasks'))
  }
  function updateTasks(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList))
  }

  return { markComplete, newTask, getAllTasks, findTaskById, deleteTask}
})();