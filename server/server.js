import express from 'express';
import connectDB from './dbConnect/connectDB.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import {blogRouter} from './routes/blogRoutes.js';
import cors from 'cors';

const app = express()
const PORT = 3000
app.use(express.json())
app.use(cors())
dotenv.config()

app.use('/api/v1/user/', userRoutes)
app.use('/api/v1/blog/', blogRouter)


const startServer = async () => {
    
    try {
        
        connectDB(process.env.MONGO_URL)

        app.listen(PORT, () => {

            console.log(`listening at port ${PORT}`)
        })
    } catch (error) {
        console.log(error.message)
    }
}

startServer()