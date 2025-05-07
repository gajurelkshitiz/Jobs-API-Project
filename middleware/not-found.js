const notFoundMiddleware = (req, res) => 
    res.status(404).send("Your Searched Routed doesn't exist!")


// const notFoundMiddleware = (req, res) => {
//     res.status(404).json({msg: "Your Searched Routed doesn't exist!"})
// }

module.exports = notFoundMiddleware