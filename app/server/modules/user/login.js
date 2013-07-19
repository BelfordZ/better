var AM = require('../account-manager');

module.exports.getLogin = function(req, res) {
// check if the user's credentials are saved in a cookie //
  if(req.cookies.user == undefined || req.cookies.pass == undefined) {
    res.render('login', { 
      title: 'Hello - Please Login To Your Account' 
    });
  } else {
    // attempt automatic login //
    AM.autoLogin(req.cookies.user, req.cookies.pass, function(o) {
      if(o != null) {
        req.session.user = o;
        res.redirect('/');
      } else {
        res.render('login', { 
          title: 'Hello - Please Login To Your Account'
        });
      }
    });
  }
};

module.exports.postLogin = function (req, res) {
  AM.manualLogin(req.param('user'), req.param('pass'), function(e, o) {
    if (!o) {
      res.send(e, 400);
    } else {
      req.session.user = o;
		  if (req.param('remember-me') == 'true') {
        res.cookie('user', o.user, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.cookie('pass', o.pass, { maxAge: 365 * 24 * 60 * 60 * 1000 });
      }
      res.send(o, 200);
    }
  });
};