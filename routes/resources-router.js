const express = require('express')

const Resources = require('./projects-model')
const Projects = require('./projects-model')

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




//   router.post('/:id/resources', (req, res) => {
//     const resourceData = req.body;
//     const { id } = req.params; 
  
//     Projects.getProjectById(id)
//     .then(project => {
//       if (project) {
//         Projects.addResource(resourceData, id)
//         .then(resource => {
//           res.status(201).json(resource);
//         })
//       } else {
//         res.status(404).json({ message: 'Could not find project with given id.' })
//       }
//     })
//     .catch (err => {
//       console.log(err)
//       res.status(500).json({ message: 'Failed to create new resource' });
//     });
//   });

module.exports = router
