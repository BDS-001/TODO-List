# Task Manager - Todo List Application

A feature-rich task management application built with vanilla JavaScript that helps you organize your tasks and projects effectively.

## Features

- **Project Management**
  - Create and manage multiple projects
  - Delete projects when no longer needed
  - View all projects in a sidebar

- **Task Management**
  - Create tasks with title, description, due date, and priority level
  - Mark tasks as complete
  - Delete tasks
  - Change priority level of tasks (low, medium, high)

- **Task Organization**
  - View all tasks from all projects
  - View tasks due today
  - View upcoming tasks (due within the next 7 days)
  - View in-progress tasks (tasks not yet completed)
  - See tasks grouped by their respective projects

- **Data Persistence**
  - All projects and tasks are saved to localStorage
  - Data persists between browser sessions

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Webpack for module bundling
- localStorage for data persistence
- Bootstrap Icons for UI elements

## Project Structure

```
├── src/
│   ├── content-control.js   # Handles page content and UI updates
│   ├── globals.js           # Global variables and utility functions
│   ├── index.js             # Main entry point for the application
│   ├── modals.js            # Controls for modal dialogs (add project/task)
│   ├── projects.js          # Project and task data management
│   └── index.html           # Main HTML structure
├── dist/
│   ├── main.js              # Bundled JavaScript file
│   └── styles.css           # CSS styles
├── webpack.config.js        # Webpack configuration
└── package.json             # Project dependencies and scripts
```

## How It Works

### Projects

The application uses a module pattern to organize code. Projects are stored as objects with properties including:
- `name`: Project name
- `desc`: Project description
- `id`: Unique identifier
- `tasks`: Array of task IDs associated with the project

### Tasks

Tasks are also stored as objects with properties including:
- `title`: Task title
- `desc`: Task description
- `date`: Creation date
- `dueDate`: Due date
- `project`: ID of the parent project
- `completed`: Boolean indicating completion status
- `priorityLevel`: Priority level (low, medium, high)

### Data Storage

All data is stored in the browser's localStorage using JSON format. The application includes functions to:
- Generate unique IDs for projects and tasks
- Save and retrieve data from localStorage
- Handle data updates and deletions

### User Interface

The UI is divided into:
- A header with the application title
- A sidebar for navigation and project management
- A main content area for viewing and managing tasks
- Modal dialogs for creating new projects and tasks

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/todo-list.git
   cd todo-list
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Build the project
   ```
   npm run build
   ```

4. Open `index.html` in your browser or set up a local server

## Usage

1. **Creating a New Project**:
   - Click the "+" button in the Projects section
   - Enter project name and description
   - Click "Submit"

2. **Creating a New Task**:
   - Navigate to a project
   - Click "Add Task"
   - Enter task details (name, description, due date, priority)
   - Click "Submit"

3. **Completing a Task**:
   - Click "Complete Task" on any task card

4. **Deleting a Task**:
   - Click "Remove Task" on any task card

5. **Changing Task Priority**:
   - Use the priority dropdown on any task card

6. **Viewing Different Task Lists**:
   - Click on the sidebar options:
     - "All" to view all tasks grouped by project
     - "Today" to view tasks due today
     - "Upcoming" to view tasks due within 7 days
     - "Inprogress" to view all incomplete tasks

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built as part of The Odin Project curriculum
