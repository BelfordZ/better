var AM = require('../account-manager');

module.exports.getUserSite = function(req, res) {
    var userQ = req.url.substr(1); //removes leading slash
    console.log(userQ);
    AM.getUserObjectFromSiteName(userQ, function(o) {
        if (o != null) {
            //res.send(o, 200);
            res.render('templates/' + o.site.template + '/' + o.site.template, {site: o.site});
        } else {
            console.log("site loading failed");
        }
    });
};