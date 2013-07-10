var CT = require('../country-list');
var AM = require('../account-manager');

module.exports.getRegister = function(req, res) {
  res.render('register', {
    title: 'Registration',
    countries : CT 
  });
}

module.exports.postRegister = function(req, res) {
  // load the defaults for a new user
  var newAccnt = require('../../prototypes/account.js').accountObj;
  newAccnt.site = require('../../prototypes/site.js').siteObj;
  
  //change defaults from posted params
  newAccnt.name = req.param('name');
  newAccnt.email = req.param('email');
  newAccnt.user = req.param('user');
  newAccnt.pass = req.param('pass');
  //used for searching
  newAccnt.siteName = req.param('siteName');
  //used for rendering
  newAccnt.site.name = req.param('siteName');
  newAccnt.country = req.param('country');
    
  AM.addNewAccount(newAccnt, function(e) {
    if (e) {
      res.send(e, 400);
    } else {
      res.send('ok', 200);
    }
  });
};