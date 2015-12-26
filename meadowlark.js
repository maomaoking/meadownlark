/**
 * Created by zhangyumou on 15/12/26.
 */
var express = require('express');

var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
];


//路由开始
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function (req, res) {
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    res.render('about');
});
//404
app.use(function (req, res) {
    //res.type('text/plain');
    res.status(404);
    //res.send('404 - not found');
    res.render('404');
});

//500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    //res.type('text/plain');
    res.status(500);
    //res.send('500 - server error');
    res.render('500');
});


app.listen(app.get('port'), function () {
    console.log( 'Express started on http://localhost:' +
        app.get('port')+ '; press Ctrl-C to terminate.');
});