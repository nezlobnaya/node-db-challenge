const express = require('express')

const Tasks = require('./projects-model')

const router = express.Router({
    mergeParams: true
})


router.get('/', (req, res, next) => {
    Tasks.getAllTasks()
    .then(task => {
        res.json(task)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Tasks.getTaskById(id)
    .then(task => {
        const booleanTask = {
            ...task,
            completed: !!+`${task.completed}`
        }
        if (task) {
            res.json(booleanTask);
        } else {
            res.status(404).json({ message: 'Could not find task with given id.' })
        }
    })
    .catch (err => {
        next(err)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Tasks.removeTask(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to delete task' });
    });
  });


  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Tasks.getTaskById(id)
    .then(task => {
      if (task) {
        Tasks.updateTask(changes, id)
        .then(updatedTask => {
          res.json(updatedTask);
        });
      } else {
        res.status(404).json({ message: 'Could not find task with given id' });
      }
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to update task' });
    });
  });


module.exports = router
