/*
 * NewlyWebs Framework
 * Property of Airau
 * By Zachary Belford
 */
var express = require('express')
, http = require('http')
, app = express();

app.configure(function(){
    app.set('port', 8080);
    app.set('views', __dirname + '/app/server/views');
    app.set('view engine', 'ejs');
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'wVrw>&WRjbPH|Z9CZtL?m;]*jL>>7-c.Y.xcshMitYZ};g%keX%4rQ2f-z:7a9+6' }));
    app.use(express.methodOverride());
    app.use(express.logger('dev'));
    app.use(express.favicon());
    app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
    app.use(express.static(__dirname + '/app/client'));
    // development only
    if ('development' == app.get('env'))
        app.use(express.errorHandler());

});

require('./app/server/router')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
