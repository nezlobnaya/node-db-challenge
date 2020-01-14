const db = require('../../data/db-config')
const utils = require('../utils/utils-model')

module.exports = {

    getTasks,
    getAllTasks,
    getTaskById,
    addTask,
    removeTask,
    updateTask,
    findContextsByTask,
    addContext,

}

   
    function getTasks(id) {
        return db('tasks').where({ project_id: id })
    }
    

    function getAllTasks() {
        return db('tasks')
    }

    function addTask(task, project_id) {
        task = {...task, project_id};
        return db('tasks').insert(task)
        .then(() => {
            return task
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


    function findContextsByTask(id) {
        return db('contexts as c')
        .select('c.name', 'tc.task_id')
        .join('tasks_contexts as tc', 'tc.context_id', 'c.id')
        .join('tasks as t', 't.id', 'tc.task_id')
        .where('tc.task_id', id)
    }

    function getTaskById(id) {
        let query = db('tasks as t').where( 't.id', id ).first()
        const promises = [query, findContextsByTask(id)]

        return Promise.all(promises)
            .then(function(results) {
            let [task, contexts] = results;
      
            if (task) {
              task.contexts = contexts;
              return utils.taskToBody(task);
            } else {
              return null;
            }
          });
    }

    function removeTask(id) {
        return db('tasks').where({ id }).del()
    }

    function updateTask(changes, id) {
        return db('tasks').where({ id }).update(changes)
        .then(count => {
            return getTaskById(id)
        })
    }
