var CT = require('../country-list');
var AM = require('../account-manager');
var fs = require('fs');

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
    
    var userName = req.param('user');
    newAccnt.user = userName;
    //used for searching
    newAccnt.siteName = userName;
    //used for rendering
    newAccnt.site.name = userName;
    
    newAccnt.pass = req.param('pass');
    newAccnt.country = req.param('country');
    console.log(newAccnt.site.name);
    AM.addNewAccount(newAccnt, function(err) {
        if (err) {
            res.send(err, 400);
            console.log(err);
        } else {
            fs.mkdir('app/client/userContent/' + userName, function (err) {
                if (err) {
                    res.send(err, 400);
                    console.log(err);
                } else {
                    fs.mkdir('app/client/userContent/' + userName + '/img/', function (err) {  
                        if (err) {
                            res.send(err, 400);
                            console.log(err);
                        } else {
                            res.send('ok', 200);
                        }
                    });
                }
            });
        }
    });
};