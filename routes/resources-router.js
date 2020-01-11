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




module.exports = router
