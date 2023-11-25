class Project {
    constructor(name, data) {
        this.name = name
        this.data = data
        this.tasks = []
    }

    addTask(title, desc, date, project) {
        const taskId = this.generateUniqueId();
        const task = new Task(taskId, title, desc, date, project);
        this.tasks.push(task);
        return task;
      }

      markTaskCompleted(taskId) {
        const task = this.findTaskById(taskId);
        if (task) {
          task.markComplete();
          return true; // Task marked as completed successfully
        }
        return false; // Task not found
      }
    
      generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
      }
    
      findTaskById(taskId) {
        return this.tasks.find(task => task.id === taskId);
      }
    
      getInProgressTasks() {
        return this.tasks.filter(task => !task.completed);
      }
    
      getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
      }
}

class Task {
    constructor(id, title, desc, date, project) {
        this.id = id
        this.title = title
        this.desc = desc
        this.date = date
        this.project = project
        this.completed = false
    }

    markComplete() {
        this.completed = true
    }
}