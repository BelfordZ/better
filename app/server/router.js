var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

module.exports = function(app) {
    app.get('/*', function(req, res) {
        if (req.url == '/') {
            require('./modules/system/login').getLogin(req, res);
        } else if (req.url == '/register') {
            require('./modules/system/register').getRegister(req, res);
        } else if (req.url == '/edit') {
            restrict(req, res, function() {
                require('./modules/user/edit').getEdit(req, res);
            });
        } else if(req.url == '/my-apps') {
            restrict(req, res, function() {
                require('./apps/my-apps').getApps(req, res);
            });
        } else if (req.url == '/my-apps/guest-list') {
            restrict(req, res, function() {
                require('./apps/guest-list/guest-list').getGuestList(req, res);
            });  
        } else if(req.url == '/logout') {
            require('./modules/user/logout').getLogout(req, res);
        } else {
            console.log('Unhandled Request to: ' + req.url);
            console.log('------> Checking if user site exists');
            require('./modules/system/sites').getUserSite(req, res, function() {
            });
        }
    });
    app.post('/*', function(req, res) {
        // On post to home page, Try to log in the user
        if (req.url == '/') {
            require('./modules/system/login').postLogin(req, res);
        }
        // On post to register, validate/verify input data and create a new account, redirect to /edit
        else if (req.url == '/register') {
            require('./modules/system/register').postRegister(req, res);
        } 
        // On post to register, could have -> changed blocks, added/removed blocks, etc etc
        else if (req.url == '/edit') {
            require('./modules/user/edit').postEdit(req, res);
        }
            });
    // Access restriction functions. If logged in, will run the 'next' function passed in
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
};
    
    //app.get('/edit', restrict, function(req, res) {
    //    require('./modules/user/edit').getEdit(req, res);
    //});
    //app.post('/edit', restrict, function(req, res) {
    //    require('./modules/user/edit').postEdit(req, res);
    //});
    
    /*************************************/
    /*  End of Access Restricted URLs    */
    /*************************************/
    
    
    
    
    /*
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
    
    app.get('/:action', function(req, res) {
        if (req.url != '/favicon.ico') {
            require('./modules/system/sites').getUserSite(req, res);
        } else {
            res.render('404', { title: 'Page Not Found'});
        }
    });
    */