var AM = require('../../modules/account-manager');

module.exports.getGuestList = function(req, res) {
    // need to get an updated user object from the database before we render the page
    AM.getUserObject(req.session.user.user, function(o) {
        req.session.user = o;
        res.render('apps/guest-list/guest-list',
                   { userData: req.session.user }
                  );
    });
};