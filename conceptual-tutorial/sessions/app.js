import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';

//Package documentation = https://www.npmjs.com/package/connect-mongo
import MongoStoreFactory from 'connect-mongo';
const MongoStore = MongoStoreFactory(session);

//Create the Express application
var app = express();
// <user>:<password>@
//'mongodb://localhost:27017/tutorial_db'
//const dbString = "mongodb://localhost:27017"   this didn't work
const dbString = "mongodb://127.0.0.1:27017/auth_db"
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions);

connection.on('open', () => {
    console.log('Connected to MongoDB server');
  });
  
  connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24 //Equals 1 day expiration
    }
}));

app.get('/', (req, res, next) => {
    res.send('<h1>Sessions Tutorial</h1>')
});

app.get('/jacob', (req, res, next) => {
    res.send('<h1>Hey Jacob</h1>')
});


app.listen(3000);



