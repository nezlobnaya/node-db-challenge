const db = require('../../data/db-config')

module.exports = {
    getResources,
    getResourcesByProject,
    getResourceById,
    addResource,
    removeResource,
    updateResource,

}

    function getResources() {
        return db('resources as r')
        .select('r.id','r.name', 'r.description', 'pr.project_id')
        .join('projects_resources as pr', 'pr.resource_id', 'r.id')
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

    function getResourceById(id) {
        return db('resources').where({ id }).first()
    }


    function removeResource(id) {
        return db('resources').where({ id }).del()
    }

    function updateResource(changes, id) {
        return db('resources').where({ id }).update(changes)
        .then(count => {
            return getResourceById(id)
        })
    }
