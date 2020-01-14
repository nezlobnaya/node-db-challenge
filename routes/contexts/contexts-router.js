const express = require('express')

const Contexts = require('./contexts-model')

const router = express.Router({
    mergeParams: true
})


router.get('/', (req, res, next) => {
    Contexts.findAllContexts()
    .then(contexts => {
        res.json(contexts)
    })
    .catch(err => {
        next(err)
    })
})



router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Contexts.findContextById(id)
    .then(context => {
        if (context) {
            res.json(context);
        } else {
            res.status(404).json({ message: 'Could not find context with given id.' })
        }
    })
    .catch (err => {
        next(err)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Contexts.removeContext(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find context with given id' });
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to delete context' });
    });
  });


  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Contexts.findContextById(id)
    .then(context => {
      if (context) {
        Contexts.updateContext(changes, id)
        .then(updatedContext => {
          res.json(updatedContext);
        });
      } else {
        res.status(404).json({ message: 'Could not find context with given id' });
      }
    })
    .catch (err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to update context' });
    });
  });


module.exports = router
