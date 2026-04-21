import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors());

app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}));

app.use(cookieParser());




import userRouter from './routes/user.routes.js'
import taskRouter from './routes/task.routes.js'

app.use("/api/v1/user",userRouter)
app.use("/api/v1/task",taskRouter)


export {app}