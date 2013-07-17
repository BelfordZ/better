var AM = require('../account-manager');
var fs = require('fs');

module.exports.getEdit = function(req, res) {
    // need to get an updated user object from the database before we render the page
    AM.getUserObject(req.session.user.user, function(o) {
        req.session.user = o;
        res.render('templates/' + req.session.user.site.template + '/' + 'edit/' + req.session.user.site.template,
                   { userData: req.session.user }
                  );
    });
}
module.exports.postEdit = function(req, res) {
    if (req.param("content")) {
        req.session.user.site.blocks[req.param("linkIndex")].content.body = req.param('content');
        AM.updateTextBlock(req.session.user.user, req.param("linkIndex"), req.param('content'), 
                           function(e, o) {
                               if(e) {
                                   res.send('error-updating-account', 400);
                                   console.log("big bad error");
                               } else {
                                   // update the user's login cookies if they exists //
                                   if (req.cookies.user != undefined && req.cookies.pass != undefined) {
                                       res.cookie('user', o.user, { maxAge: 365 * 24 * 60 * 60 * 1000 });
                                       res.cookie('pass', o.pass, { maxAge: 365 * 24 * 60 * 60 * 1000 });	
                                   }
                                   console.log("NOT big bad error: " + JSON.stringify(o));
                                   res.send('ok', 200);
                               }
                           });
    } else if (req.files) {
        fs.readFile(req.files.inputImg.path, function (err, data) {
            console.log(__dirname);
            var newPath = '/userContent/img/' + req.files.inputImg.name;
            fs.writeFile(newPath, data, function (err) {
                res.send(err, 400);
            });
        });
        req.session.user.site.blocks[req.param("blockIndex")].imgs.push(
            {
                "filename": '../../client/userContent/img/' + req.files.inputImg.name
            }
        );
        AM.updateGalleryBlock(req.session.user, function(e, o) {
            if(e) {
                res.send('error-updating-account', 400);
                console.log("big bad error");
            } else {
                // update the user's login cookies if they exists //
                if (req.cookies.user != undefined && req.cookies.pass != undefined) {
                    res.cookie('user', o.user, { maxAge: 365 * 24 * 60 * 60 * 1000 });
                    res.cookie('pass', o.pass, { maxAge: 365 * 24 * 60 * 60 * 1000 });	
                }
                console.log("NOT big bad error: " + JSON.stringify(o));
                res.send('ok', 200);
            }
        });
    }
        }