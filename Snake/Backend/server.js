require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRouter')

const app = express()

//Middleware
app.use(cors({origin: process.env.FRONTEND_URL})) //replace later
app.use(express.json())

//Database connection
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

//Routes
app.use('/api/users', userRoutes)


//Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`Server running on  http://localhost:${PORT}`)
})