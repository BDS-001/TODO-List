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
      projectList[`${project['id']}`] = project
      localStorage.setItem('projects', JSON.stringify(projectList))

      return project
  }

  function addTask(project, title, desc) {
      const taskId = generateUniqueId();
      const task = newTask(taskId, title, desc, project.name);
      project.tasks.push(task.taskId);
      tasks.newTask(task)
      return task;
  }

  function markTaskCompleted(taskId) {
      const task = findTaskById(taskId);
      if (task) {
      task.markComplete(taskId);
      return true; // Task marked as completed successfully
      }
      return false; // Task not found
  }
  
  function generateUniqueId() {
      // Generate a random number and convert it to a hexadecimal string
      const randomPart = Math.floor(Math.random() * Date.now()).toString(16);

      // Use the current timestamp to ensure uniqueness
      const timestampPart = new Date().getTime().toString(16);

      // Concatenate the random and timestamp parts
      const uniqueId = randomPart + timestampPart;

      return uniqueId;
  }
  
  function findTaskById(taskId) {
      const tasksList = JSON.parse(localStorage.getItem('tasks'))
      return tasksList[taskId];
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

  return { newProject, findTaskById, getCompletedTasks, getInProgressTasks, generateUniqueId }
})();

export const tasks = (function() {
  if (!localStorage.getItem('tasks')) {
      let newTasksList = {}
      newTasksList = JSON.stringify(newTasksList)
      localStorage.setItem('tasks', newTasksList)
  }

  function markComplete(taskId) {
      const taskList = JSON.parse(localStorage.getItem('tasks'))
      taskList[taskId].completed = true
      localStorage.setItem('tasks', JSON.stringify(taskList))
  }

  function newTask(id, title, desc, projectId) {
    const task = {
      'id': id,
      'title': title,
      'desc': desc,
      'date': Date.now(),
      'project': projectId,
      'completed': false
  }
      const taskList = JSON.parse(localStorage.getItem('tasks'))
      taskList[task.taskId] = task
      localStorage.setItem('tasks', JSON.stringify(taskList))

      return task
  }

  return { markComplete, newTask }
})();