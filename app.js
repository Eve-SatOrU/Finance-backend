// your main app
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const session = require('express-session');
const cors = require('cors');

// env 
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use(
  session({
    secret: 'lol',
    resave: false,
    saveUninitialized: true,
  })
);

// cors 
app.use(cors());

const routes = require('./routes/routes');
const adminRoutes = require('./routes/admin');
app.use('/api', routes);
app.use('/api/admin', adminRoutes);




const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

const User = require('./models/user');
const Expert = require('./models/expert');





const PORT = 3001 || process.env.PORT;

sequelize.sync()
.then(result => {
    app.listen(PORT);
    console.log(" lessss go ?! ");
  })
.catch(err => {
    console.log(err);
});
