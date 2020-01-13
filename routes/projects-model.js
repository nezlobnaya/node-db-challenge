const db = require('../data/db-config')

module.exports = {
    getResources,
    getResourcesByProject,
    getResourceById,
    addResource,
    removeResource,
    updateResource,

    getAllProjects,
    getProjectById,//stretch
    addProject,
    removeProject,
    updateProject,

    getTasks,
    getAllTasks,
    getTaskById,
    addTask,
    removeTask,
    updateTask,


    intToBoolean,
    projectToBody,
    taskToBody,

    findAllContexts,
    findContextsByTask,
    findContextById,
    addContext,
    removeContext,
    updateContext,
}

    function intToBoolean(int) {
        return int === 1 ? true : false;
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

    function getResources() {
        return db('resources as r')
        .select('r.id','r.name', 'r.description', 'pr.project_id')
        .join('projects_resources as pr', 'pr.resource_id', 'r.id')
    }


    function getAllProjects() {
        return db('projects')
    }

    function getProjectById(id) {
        let query = db('projects as p').where( 'p.id', id ).first()
        const promises = [query, this.getTasks(id), this.getResourcesByProject(id)]

        return Promise.all(promises)
            .then(function(results) {
            let [project, tasks, resources] = results;
      
            if (project) {
              project.tasks = tasks;
              project.resources = resources;
              return projectToBody(project);
            } else {
              return null;
            }
          });
    }

    function getTasks(id) {
        return db('tasks').where({ project_id: id })
    }
    

    function getAllTasks() {
        return db('tasks')
    }

    function findAllContexts() {
        return db('contexts as c')
        .select('c.id', 'c.name', 'tc.task_id')
        .join('tasks_contexts as tc', 'tc.context_id', 'c.id')
    }

    function findContextsByTask(id) {
        return db('contexts as c')
        .select('c.name', 'tc.task_id')
        .join('tasks_contexts as tc', 'tc.context_id', 'c.id')
        .join('tasks as t', 't.id', 'tc.task_id')
        .where('tc.task_id', id)
    }

    function getResourcesByProject(id) {
        return db('resources as r')
        .select('r.name', 'r.description')
        .join('projects_resources as pr', 'pr.resource_id', 'r.id')
        .where('pr.project_id', id)
    }

    function addResource(projectId, resource) {
        return db('resources as r').insert(resource)
        .then (([id]) => {
            return db('projects_resources as pr').insert({
                project_id: projectId,
                resource_id: id
            })
        .then (() => {
            return resource
        })
     })
    }

    function addContext(taskId, context) {
        return db('contexts as c').insert(context)
        .then (([id]) => {
            return db('tasks_contexts as tc').insert({
                task_id: taskId,
                context_id: id
            })
        .then (() => {
            return context
        })
     })
    }

    function addProject(project) {
        return db('projects').insert(project)
        .then( ids => {
            return getProjectById(ids[0])
        })
    }

    function addTask(task, project_id) {
        task = {...task, project_id};
        return db('tasks').insert(task)
        .then(() => {
            return task
        })
    }

    // function getTaskById(id) {
    //     return db('tasks').where({ id }).first()
    // }

    function getTaskById(id) {
        let query = db('tasks as t').where( 't.id', id ).first()
        const promises = [query, this.findContextsByTask(id)]

        return Promise.all(promises)
            .then(function(results) {
            let [task, contexts] = results;
      
            if (task) {
              task.contexts = contexts;
              return taskToBody(task);
            } else {
              return null;
            }
          });
    }

    function getResourceById(id) {
        return db('resources').where({ id }).first()
    }

    function findContextById(id) {
        return db('contexts').where({ id }).first()
    }

    function removeResource(id) {
        return db('resources').where({ id }).del()
    }

    function removeContext(id) {
        return db('contexts').where({ id }).del()
    }

    function removeProject(id) {
        return db('projects').where({ id }).del()
    }

    function removeTask(id) {
        return db('tasks').where({ id }).del()
    }

    function updateProject(changes, id) {
        return db('projects').where({ id }).update(changes)
        .then(project => {
            return project
        })
    }

    function updateTask(changes, id) {
        return db('tasks').where({ id }).update(changes)
        .then(count => {
            return getTaskById(id)
        })
    }

    function updateResource(changes, id) {
        return db('resources').where({ id }).update(changes)
        .then(count => {
            return getResourceById(id)
        })
    }

    function updateContext(changes, id) {
        return db('contexts').where({ id }).update(changes)
        .then(count => {
            return findContextById(id)
        })
    }
