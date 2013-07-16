var AM = require('../modules/account-manager');

module.exports.getApps = function(req, res) {
    // need to get an updated user object from the database before we render the page
    console.log("getting apps list");
    AM.getUserObject(req.session.user.user, function(o) {
        req.session.user = o;
        res.render('templates/' + req.session.user.site.template + '/apps',
                   { userData: req.session.user }
                  );
    });
};