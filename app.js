require('dotenv').config()
require('express-async-errors');

const express = require('express')
const app = express();

// connect db
const connectDB = require('./db/connect')
// authentication middleware
const authenticationMiddleware = require('./middleware/authentication')

// routers importing
const authRouter  = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


// importing error handling middlewares
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require('./middleware/error-handler')

// useful middlewares for json body
app.use(express.json())




// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticationMiddleware, jobsRouter);



app.use(notFoundMiddleware) // route not found]
app.use(errorHandlerMiddleware) // error handler




// defing the port and ready for the server to start..
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => 
            console.log(`Server is running at ${port}`)
        )
    }
    catch (err){
        console.log(err);
    }
}

start();