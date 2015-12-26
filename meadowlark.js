/**
 * Created by zhangyumou on 15/12/26.
 */
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

//404
app.ues(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
});

//500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - server error');
});

//200
//app.use(function (req, res) {
//
//})
app.listen(app.get('port'), function () {
    console.log( 'Express started on http://localhost:' +
        app.get('port')+ '; press Ctrl-C to terminate.');
})