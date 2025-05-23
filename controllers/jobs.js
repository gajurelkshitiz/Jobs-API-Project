const Job = require('../models/jobs')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')


const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.CREATED).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req

    const job = await Job.findOne({
        _id: jobId, createdBy: userId
    })

    if(!job) {
        throw new NotFoundError(`No Job with id: ${jobId}`)
    }

    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)  
    res.json(job)
}

const updateJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}, body:{company, position}} = req
    
    if (company === '' || position === '') {
        throw new BadRequestError('company or position field cannot be empty')
    }
    const job = await Job.findOneAndUpdate({_id: jobId, createdBy: userId}, 
                                            req.body, 
                                            {new: true, runValidators: true})

    if(!job) {
        throw new NotFoundError(`No Job Found with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOneAndDelete({_id: jobId, createdBy: userId})
    if(!job) {
        throw new NotFoundError(`No Job Found with id: ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}