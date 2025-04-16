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
      const newProjectsList = {};
      updateProjects(newProjectsList);
  }

  function newProject(name, desc) {
      const project = {
        'name': name,
        'desc': desc,
        'id': generateUniqueId(),
        'tasks': []
      }

      const projectList = getProjects() || {};
      projectList[project.id] = project;
      updateProjects(projectList);

      return project;
  }

  function addTask(projectId, title, desc, dueDate, priorityLevel) {
      const projectList = getProjects();

      const taskId = generateUniqueId();
      const task = tasks.newTask(taskId, title, desc, projectId, dueDate, priorityLevel);
      projectList[projectId].tasks.push(task.id);
      tasks.newTask(task);
      return task;
  }

  function getProjectById(targetId) {
    if (targetId) {
        const projectsList = getProjects();
        return projectsList[targetId];
    }
  }
  
  function getInProgressTasks(projectId) {
      const tasksList = tasks.getTaskList();
      if (tasksList) {
        return tasksList.filter(task => !task.completed && task.project == projectId);
      }
  }
  
  function getCompletedTasks(projectId) {
      const tasksList = tasks.getTaskList();
      return tasksList.filter(task => task.completed && task.project == projectId);
  }

  function getAllProjectTasks(projectId) {
    const tasksList = tasks.getTaskList();
    return tasksList.filter(task => task.project == projectId);
  }

  function deleteProject(projectId) {
    const projectsList = getProjects();
    const taskList = tasks.getTaskList();

    taskList.forEach(task => {
      if (task.project === projectId) {
        tasks.deleteTask(task.id);
      }
    });
    delete projectsList[projectId];
    updateProjects(projectsList);
  }

  function getProjects() {
    try {
      return JSON.parse(localStorage.getItem('projects')) || {};
    } catch (e) {
      console.error("Error parsing projects from localStorage:", e);
      return {};
    }
  }

  function updateProjects(projectList) {
    localStorage.setItem('projects', JSON.stringify(projectList));
  }

  return { newProject, getCompletedTasks, getInProgressTasks, addTask, getAllProjectTasks, getProjectById, deleteProject, getProjects };
})();

export const tasks = (function() {
  if (!localStorage.getItem('tasks')) {
      let newTasksList = {};
      updateTasks(newTasksList);
  }

  function markComplete(taskId) {
      const taskList = getTasks();
      if (taskList[taskId]) {
        taskList[taskId].completed = true;
        updateTasks(taskList);
      }
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
    };
    
    const taskList = getTasks() || {};
    taskList[task.id] = task;
    updateTasks(taskList);

    return task;
  }

  function getTaskList() {
      return Object.values(getTasks() || {});
  }

  function findTaskById(taskId) {
    const tasksList = getTasks();
    return tasksList[taskId];
  }

  function deleteTask(taskId) {
    let taskList = getTasks();
    delete taskList[taskId];
    updateTasks(taskList);
  }

  function getTasks() {
    try {
      return JSON.parse(localStorage.getItem('tasks')) || {};
    } catch (e) {
      console.error("Error parsing tasks from localStorage:", e);
      return {};
    }
  }
  
  function updateTasks(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }

  return { markComplete, newTask, getTaskList, findTaskById, deleteTask, getTasks, updateTasks};
})();