var AM = require('../account-manager');
var CT = require('../country-list');
var sugar = require('sugar');

module.exports.getMyAccount = function(req, res) {
    // need to get an updated user object from the database before we render the page
    AM.getUserObject(req.session.user.user, function(o) {
        req.session.user = o;
        res.render('templates/' + o.site.template + '/edit/my-account', {
            countries: CT,
            userData: req.session.user,
            numDaysTilExpired: Date.create().daysUntil(req.session.user.expires)
        });
    });
}
module.exports.postHome = function(req, res) {
    var updateValues = {
        user: req.param('user'),
        name: req.param('name'),
        email: req.param('email'),
        groupname: req.param('groupname'),
        country: req.param('country'),
        pass: req.param('pass')
    };
    AM.updateAccount(updateValues, function(e, o) {
        if(e) {
            res.send('error-updating-account', 400);
        } else {
            // update the user's login cookies if they exists //
            if (req.cookies.user != undefined && req.cookies.pass != undefined){
                res.cookie('user', o.user, { maxAge: 365 * 24 * 60 * 60 * 1000 });
                res.cookie('pass', o.pass, { maxAge: 365 * 24 * 60 * 60 * 1000 });	
            }
            res.send('ok', 200);
        }
    });
};