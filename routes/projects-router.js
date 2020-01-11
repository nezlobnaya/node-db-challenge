const express = require('express')

const Projects = require('./projects-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Projects.getAllProjects()
    .then(projects => {
        projects = projects.map((project) => {
            return {
                ...project,
                completed: !!+`${project.completed}`
                //completed: project.completed === 0 ? false : true 
            }
        })
        res.json(projects)
    })
    .catch(err => {
        next(err)
    })
})

router.get('/:id', (req, res, next) => {
    const { id } =req.params

    Projects.getProjectById(id)
    .then(project => {
        const booleanProject = {
            ...project,
            completed: !!+`${project.completed}`
        }
        if(project) {
            res.json(booleanProject)
        } else {
            res.status(404).json({ message: 'Could not find project with given id' })
        }
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
})

router.get('/:id/tasks', (req, res, next) => {
    const { id } = req.params

    Projects.getTasks(id)
    .then(tasks => {
        tasks = tasks.map((task) => {
            return {
                ...task,
                completed: !!+`${task.completed}`
            }
        })
        if (tasks.length) {
                res.json(tasks)
            } else {
            res.status(404).json({
                message: 'Could not find tasks for given project'
            })
        }
    })
    .catch(err => {
        next(err)
        
    })
})


router.get('/:id/resources', (req, res, next) => {
    const { id } = req.params

    Projects.getResourcesByProject(id)
    .then(resources => {
        if (resources.length) {
            res.json(resources)
        } else {
            res.status(404).json({
                message: 'Could not find resources for given project'
            })
        }
    })
    .catch(err => {
        next(err)
    })
})

router.post('/', (req, res) => {
    const projectData = req.body;
  
    Projects.addProject(projectData)
    .then(project => {
        const booleanProject = {
            ...project,
            completed: !!+`${project.completed}`
        }
      res.status(201).json(booleanProject);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new project' });
    });
  });

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;
    const { id } = req.params; 
  
    Projects.getProjectById(id)
    .then(project => {
      if (project) {
        Projects.addTask(taskData, id)
        .then(task => {
          res.status(201).json(task);
        })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch (err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to create new task' });
    });
  });

  router.post('/:id/resources', (req, res) => {
    const resourceData = req.body;
    const { id } = req.params; 
  
    Projects.getProjectById(id)
    .then(project => {
      if (project) {
        Projects.addResource(resourceData)
        .then(resource => {
          res.status(201).json(resource);
        })
      } else {
        res.status(404).json({ message: 'Could not find project with given id.' })
      }
    })
    .catch (err => {
      console.log(err)
      res.status(500).json({ message: 'Failed to create new resource' });
    });
  });

module.exports = router
