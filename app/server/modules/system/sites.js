var AM = require('../account-manager');

module.exports.getUserSite = function(req, res, next) {
    var userQ = req.url.substr(1); //removes leading slash
    console.log('GET request to: /' + userQ);
    AM.getUserObjectFromSiteName(userQ, function(o) {
        if (o != null) {
            //res.send(o, 200);
            console.log('Site Found! Redirecting...');
            res.render('templates/' + o.site.template + '/' + o.site.template, {site: o.site});
        } else {
            console.log('+-----> not a user site, pass!' )
            next();
        }
    });
};