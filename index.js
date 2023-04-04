const express = require("express");
// const bodyParser = require("body-parser");


const path = require('path');

const usersRouter = require('./routers/users');
const authRoutes = require('./routers/authRoutes');
const messageRoutes = require('./routers/message.routes')

const app = express();

const port = process.env.PORT || 4001;

app.use(express.static('public'));

// app.use(bodyParser.json())

app.use(express.json())


app.use('/users', usersRouter)
app.use('/', authRoutes);
app.use('/', messageRoutes);

app.get('/', (req, res) => {
  // res.send('Welcome to our server!')
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => {
 console.log(`Web server is listening on port ${port}!`);
});
