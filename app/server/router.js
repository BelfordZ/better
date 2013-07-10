var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

function restrict(req, res, next) {
  if(req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

function restrictAdmin(req, res, next) {
  if(req.session.user && req.session.user.admin) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = function(app) {
  // debugging sessions //
  app.get('/sessions', restrictAdmin, function(req, res) {
    require('./modules/admin/debug').sessions(req, res);
  });

  // main login page //
  app.get('/', function(req, res){
    require('./modules/user/login').getLogin(req, res);
  });
  app.post('/', function(req, res){
    require('./modules/user/login').postLogin(req, res);
  });
    
  // logged-in user homepage //
  app.get('/home', restrict, function(req, res) {
    require('./modules/user/home').getHome(req, res);
  });
  app.post('/home', restrict, function(req, res) {
    require('./modules/user/home').postHome(req, res);
  });
  app.post('/logout', restrict, function(req, res) {
    require('./modules/user/logout').postLogout(req, res);
  });

  // creating new accounts //
  app.get('/signup', function(req, res) {
    require('./modules/user/register').getRegister(req, res);
  });
  app.post('/signup', function(req, res) {
    require('./modules/user/register').postRegister(req, res);
  });
  
  // password reset //
  app.post('/lost-password', function(req, res) {
    require('./modules/user/resetPassword').postResetPassword(req, res);
  });
  
  app.get('/reset-password', function(req, res) {
    require('./modules/user/resetPassword').getResetPassword(req, res);
  });
  app.post('/reset-password', function(req, res) {
    var nPass = req.param('pass');
    
    // retrieve the user's email from the session to lookup their account and reset password //
    var email = req.session.reset.email;
	
    // destory the session immediately after retrieving the stored email //
    req.session.destroy();
    AM.updatePassword(email, nPass, function(e, o){
	    if (o){
        res.send('ok', 200);
	    }	else {
        res.send('unable to update password', 400);
	    }
    })
  });
    
  // view & delete accounts //
  app.get('/print', restrictAdmin, function(req, res) {
    AM.getAllRecords( function(e, accounts){
      res.render('print', { title : 'Account List', accts : accounts });
    })
  });
  app.post('/delete', restrict, function(req, res){
	  AM.deleteAccount(req.body.id, function(e, obj) {
      if (!e) {
		    res.clearCookie('user');
		    res.clearCookie('pass');
	      req.session.destroy(function(e) { 
          res.send('ok', 200); 
        });
      }	else {
        res.send('record not found', 400);
	    }
    });
  });
  app.get('/reset', restrictAdmin, function(req, res) {
    AM.delAllRecords(function() {
      res.redirect('/print');	
    });
  });
  //var routes = require('./routes');
  /*
  app.get('/:action', routes.getUserSite); { 
    require('./modules/system/sites').getUserSite(req, res);
    //res.render('404', { title: 'Page Not Found'}); 
  });
  */

  app.get('/:action', function(req, res) {
    if (req.url != '/favicon.ico')
      require('./modules/system/sites').getUserSite(req, res);
    //res.render('404', { title: 'Page Not Found'}); 
  });

};