/**
 * Created by zhangyumou on 15/12/26.
 */
var express = require('express');
var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function (name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;

        }
    }
});
var fortune = require('./lib/fortune.js');
var formidable = require('formidable');
var jqupload  = require('jquery-file-upload-middleware');

var app = express();
app.engine('handlebars',handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') != 'production' && req.query.test === '1';
    next();
});
app.use(require('body-parser')());



app.get('/newsletter', function (req, res) {
    res.render('newsletter', {csrf: 'CSRF token goes here',layout:"section"});
})
app.post('/process', function (req, res) {
    console.log("form :"+ req.query.form);
    console.log("csrf :"+ req.body._csrf);
    console.log("name :"+ req.body.name);
    console.log("email:"+ req.body.email);
    if(req.xhr || req.accepts('json,html') === 'json'){
        console.log("json-form");
        res.send({success: true});
    } else {
        console.log("html-form");
        res.redirect(303,'/thank-you');
    }


    //res.redirect(303,'/thank-you');
});
app.get('/contest/vacation-photo', function (req, res) {
   var now = new Date();
    res.render('contest/vacation-photo',{
        year: now.getFullYear(),month: (now.getMonth() + 1)
    });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('receive files:');
        console.log(files);
        res.redirect(303,'/thank-you');
    });
});
app.use('/upload', function (req, res, next) {
    var now = Date.now();
    jqupload.fileHandler({
        uploadDir: function (){
            return __dirname + '/public/uploads/' + now;
        },
        uploadUrl: function () {
            return '/uploads/' + now;
        }
    })(req, res, next)
});

app.get('/thank-you', function(req, res){
    res.render('thank-you' ,{});
});


// mocked weather data
function getWeatherData(){
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)',
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)',
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)',
            },
        ],
    };
}

// middleware to add weather data to context
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});




app.get('/', function (req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
    res.render('home');

});
app.get('/header', function (req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
    res.type('text/plain');
    var s = '';
    for(var name in req.headers) {
        s += name + ':' + req.headers[name] + '\n';

    }
    res.send(s);

});
app.get('/req', function (req, res) {
    //res.type('text/plain');
    //res.send('Meadowlark Travel');
    var reqArry = ['params','query','body','route','headers','ip','path','host']
    res.type('text/plain');
    var s = '';
    for(var name in reqArry) {
        s += name + ':' + reqArry[name] + ':'+JSON.stringify(req[reqArry[name]])+'\n';

    }
    res.send(s);

});

app.get('/about', function (req, res) {
    //res.type('text/plain');
    //res.send('About Meadowlark Travel');
    res.render('about',{
            fortune: fortune.getFortune(),
            pageTestScript: '/qa/tests-about.js'
    });
});
app.get('/tours/hood-river', function (req, res) {
    res.render('tours/hood-river');
});
app.get('/tours/request-group-rate', function (req, res) {
    res.render('tours/request-group-rate');
});

app.get('/contect', function (req, res) {
    res.render('contect',{layout:'utmf'});
});
app.get('/jquerytest', function (req, res) {
    res.render('jquerytest',{layout:'section'});
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

