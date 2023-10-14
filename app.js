const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./router/userRouter.js');

//mongoose connection
mongoose.connect('mongodb://0.0.0.0/perfx_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error',(err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('Database Connection Established!')
});

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

app.use('/api/user',userRouter);