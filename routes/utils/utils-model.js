

module.exports = {

    taskToBody,
    intToBoolean,
    projectToBody,
}

    function intToBoolean(int) {
        return int === 1 ? true : false;
    }
  
    function taskToBody(task) {
        const result = {
        ...task,
        completed: intToBoolean(task.completed),
        };

        if (task.contexts) {
        result.contexts = task.contexts.map(task => ({
            ...task,
            completed: intToBoolean(task.completed),
        }));
        }

        return result;
    }

    function projectToBody(project) {
        const result = {
        ...project,
        completed: intToBoolean(project.completed),
        };
    
        if (project.tasks) {
        result.tasks = project.tasks.map(task => ({
            ...task,
            completed: intToBoolean(task.completed),
        }));
        }
    
        return result;
    }

   