import express from 'express'
import UserRouter from '../routers/userRouters'

const port = process.env.PORT || 8182
const app = express()

app.use(express.json())

app.use('/api/user', UserRouter)

app.listen(port, () => {
  console.log(`server thr running http://localhost:${port}`)
})