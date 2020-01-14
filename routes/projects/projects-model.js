const db = require('../../data/db-config')
const utils = require('../utils/utils-model')

module.exports = {

    getAllProjects,
    getProjectById,
    addProject,
    removeProject,
    updateProject,
    getTasks,
    getResourcesByProject,
    addResource,
    addTask,
}


    function getAllProjects() {
        return db('projects')
    }

    function getProjectById(id) {
        let query = db('projects as p').where( 'p.id', id ).first()
        const promises = [query, getTasks(id), getResourcesByProject(id)]

        return Promise.all(promises)
            .then(function(results) {
            let [project, tasks, resources] = results;
      
            if (project) {
              project.tasks = tasks;
              project.resources = resources;
              return utils.projectToBody(project);
            } else {
              return null;
            }
          });
    }

    function getTasks(id) {
        return db('tasks').where({ project_id: id })
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


    function removeProject(id) {
        return db('projects').where({ id }).del()
    }


    function updateProject(changes, id) {
        return db('projects').where({ id }).update(changes)
        .then(project => {
            return project
        })
    }

