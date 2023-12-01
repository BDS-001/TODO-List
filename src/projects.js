export const projectsList = []

export class Project {
    constructor(name, desc) {
        this.name = name
        this.desc = desc
        this.id = this.generateUniqueId()
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
          // Generate a random number and convert it to a hexadecimal string
          const randomPart = Math.floor(Math.random() * Date.now()).toString(16);

          // Use the current timestamp to ensure uniqueness
          const timestampPart = new Date().getTime().toString(16);

          // Concatenate the random and timestamp parts
          const uniqueId = randomPart + timestampPart;

          return uniqueId;
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

export class Task {
    constructor(id, title, desc, project) {
        this.id = id
        this.title = title
        this.desc = desc
        this.date = Date.now()
        this.project = project
        this.completed = false
    }

    markComplete() {
        this.completed = true
    }
}