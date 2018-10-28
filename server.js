// Load the express module and store it in the variable express (Where do you think this comes from?)
const express = require("express");
const parser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3001;
// invoke express and store the result in the variable app
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
// app.set('views', path.join(__dirname, './views'));

app.use(parser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
    console.log('getting to index');
    response.render('index.html');
});

app.get('/cars.html', function (request, response) {
    console.log('getting to cars');
    // hard-coded user data
    const cars_array = [
        { id: 1, name: "Car 1", image: 'car1.jpg'}, 
        { id: 2, name: "Car 2", image: 'car2.jpg'}, 
        { id: 3, name: "Car 3", image: 'car3.jpg'}, 
        { id: 4, name: "Car 4", image: 'car4.jpg'}
    ];
    response.render('cars.html', {
        cars: cars_array, 
        title: 'Cars page' 
    });
});

app.get('/cats.html', function (request, response) {
    console.log('getting to cats');
    // hard-coded user data
    const cats_array = [
        { id: 1, name: "Cat 1", image: 'cat1.jpg'}, 
        { id: 2, name: "Cat 2", image: 'cat2.jpg'}, 
        { id: 3, name: "Cat 3", image: 'cat3.jpg'}, 
        { id: 4, name: "Cat 4", image: 'cat4.jpg'}
    ];
    response.render('cats.html', {
        cats: cats_array, 
        title: 'Cats page' 
    });
});

app.get('/form', function (request, response) {
    console.log('getting to cats');
    response.render('form.html');
});

// catch 404 and forward to error handler
app.use(function (request, response, next){
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, request, response, next) {
    // set locals, only providing error in development
    response.locals.message = err.message;
    response.locals.error = request.app.get('env') === 'development' ? err : {};
    response.status(err.status || 500);
    // render the error page
    response.render('error', {title: 'Cars and Cats Error page'});
  });

// tell the express app to listen on port 3001, always put this at the end of your server.js file
// app.listen(3001, function() { console.log("listening on port 3001"); });         // ES5 way
app.listen(port, () => console.log(`Express server listening on port ${port}`));    // ES6 way