//require core modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
require('dotenv').config();


//init express app
const app = express();

//connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.NODE_PORT, () => {
            console.log('server listening');
        });
    })
    .catch((e) => {
        console.log(e);
    })

//middlewares    
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/users', userRouter);
app.use(projectRoutes);

app.get('/', (req, res) => {
    res.json({ success: true });
})