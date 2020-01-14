const express = require('express')

const Resources = require('./resources-model')

const router = express.Router({
    mergeParams: true
})


router.get('/', (req, res, next) => {
    Resources.getResources()
    .then(resources => {
        res.json(resources)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Resources.getResourceById(id)
    .then(resource => {
        if (resource) {
            res.json(resource);
        } else {
            res.status(404).json({ message: 'Could not find resource with given id.' })
        }
    })
    .catch (err => {
        next(err)
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    Resources.removeResource(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find resource with given id' });
      }
    })
    .catch(err => {
        console.log(err)
      res.status(500).json({ message: 'Failed to delete resource' });
    });
  });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Resources.getResourceById(id)
  .then(resource => {
    if (resource) {
      Resources.updateResource(changes, id)
      .then(updatedResource => {
        res.json(updatedResource);
      });
    } else {
      res.status(404).json({ message: 'Could not find resource with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update resource' });
  });
});


module.exports = router
