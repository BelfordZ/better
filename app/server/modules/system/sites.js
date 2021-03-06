var AM = require('../account-manager');

module.exports.getUserSite = function(req, res, next) {
    var userQ = req.url.substr(1); //removes leading slash
    console.log('GET request to: /' + userQ);
    AM.getUserObjectFromSiteName(userQ, function(o) {
        if (o != null) {
            console.log('Site Found! Redirecting...');
            res.render('templates/' + o.site.template + '/no-edit/' + o.site.template, {site: o.site, 
                                                                                        username: o.user});
        } else {
            console.log('+-----> not a user site, pass!' );
            next();
        }
    });
};