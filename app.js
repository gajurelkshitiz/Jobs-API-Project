require('dotenv').config()
require('express-async-errors');

// importing additional security packages 
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

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
app.use(rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.
    })
)

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())





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