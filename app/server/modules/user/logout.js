module.exports.getLogout = function(req, res) {
    res.clearCookie('user');
    res.clearCookie('pass');
    //res.send('ok', 200);
    req.session.destroy(function(e){res.send('ok', 200); });
    res.redirect('/');
};