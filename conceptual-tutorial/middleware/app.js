import express from 'express';

const app = express();

//app.use() expectes a middleware to run, doesn't run to the request to the endpoint is sent


//for better understanding of app.get middleware
function middleware1 (req, res, next) {
    console.log('I am middleware 1');
    req.customProperty = 100;
    //if you don't call the next parameter the browser will just keep loading
    next();
}

function middleware2 (req, res, next) {
    console.log('I am middleware 2')
    console.log(`The custom property value is: ${req.customProperty}`);
    req.customProperty = 100000
    next();
}

function middleware3 (req, res, next) {
    console.log('I am middleware 3')

    //test errorHandler
    // const errObj = new Error('I am an error')
    // next(errObj);
    next();
} 

function errorHandler (err, req, res, next) {
    if (err) {
        res.send('<h1>There was an error, please try again</h1>')
    }
}


function standardExpressCallback (requestObject, responseObject, nextMiddleware) {
    console.log("I am the standard Express function")
    //calling an object property that was applied in a previous middleware
    responseObject.send(`<h1>Standard Express Callback</h1> <h2>Custom Property Value: ${requestObject.customProperty}</h2>`);
}

app.use(middleware1)
app.use(middleware2)

//(route, optional middleware functions, callback function to handle request/response)
app.get('/', middleware3, standardExpressCallback)

//typical format you will see
app.get('/hello', (req, res, next) => {
    res.send('<h2>Hello World</h2>')
});

//order of middleware matters, so you need to put the errorHandler last
app.use(errorHandler)

app.listen(3000);
