var AM = require('../modules/account-manager');

module.exports.getApps = function(req, res) {
    // need to get an updated user object from the database before we render the page
    AM.getUserObject(req.session.user.user, function(o) {
        req.session.user = o;
        res.render('templates/' + req.session.user.site.template + '/my-apps',
                   { userData: req.session.user }
                  );
    });
};