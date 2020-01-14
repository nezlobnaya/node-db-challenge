const db = require('../../data/db-config')

module.exports = {
    
    findAllContexts,
    findContextsByTask,
    findContextById,
    addContext,
    removeContext,
    updateContext,
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

    function findContextById(id) {
        return db('contexts').where({ id }).first()
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

    function removeContext(id) {
        return db('contexts').where({ id }).del()
    }


    function updateContext(changes, id) {
        return db('contexts').where({ id }).update(changes)
        .then(count => {
            return findContextById(id)
        })
    }
