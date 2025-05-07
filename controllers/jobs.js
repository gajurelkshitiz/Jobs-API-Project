const getAllJobs = async (req, res) => {
    res.send('All jobs are shown')
}

const getJob = async (req, res) => {
    res.send('One Job showed')
}

const createJob = async (req, res) => {
    res.send('Created One Job')
}

const updateJob = async (req, res) => {
    res.send('One Job updated.')
}

const deleteJob = async (req, res) => {
    res.send('One Job deleted')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}