const express = require('express')
const router = express.Router()

const {
    getAllJobs,
    getJob,
    createJob,
    udpdateJob,
    deleteJob
} = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(udpdateJob)

module.exports = router