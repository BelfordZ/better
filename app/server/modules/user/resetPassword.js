var AM = require('../account-manager');
var EM = require('../email-dispatcher');

module.exports.getResetPassword = function(req, res) {
  var email = req.query["e"];
  var passH = req.query["p"];
    
  AM.validateResetLink(email, passH, function(e){
    if (e != 'ok'){
      res.redirect('/');
    } else{
    // save the user's email in a session instead of sending to the client //
    req.session.reset = { email:email, passHash:passH };
    res.render('reset', { title : 'Reset Password' });
    }
  })
};

module.exports.postResetPassword = function(req, res) {
// look up the user's account via their email //
    AM.getAccountByEmail(req.param('email'), function(o) {
      if (o) {
        res.send('ok', 200);
        EM.dispatchResetPasswordLink(o, function(e, m) {
		      // this callback takes a moment to return //
		      // should add an ajax loader to give user feedback //
          if (!e) {
            //	res.send('ok', 200);
          }	else {
            res.send('email-server-error', 400);
            for (k in e) {
              console.log('error : ', k, e[k]);
            }
          }
        });
      }	else {
        res.send('email-not-found', 400);
      }
    });
};