var AM = require('../account-manager');
var fs = require('fs');

module.exports.getEdit = function(req, res) {
    // need to get an updated user object from the database before we render the page
    AM.getUserObject(req.session.user.user, function(o) {
        req.session.user = o;
        res.render('templates/' + req.session.user.site.template +
                   '/' + 'edit/' + req.session.user.site.template, { userData: req.session.user });
    });
}
module.exports.postEdit = function(req, res) {
    // if the update was to a text block
    if (req.param("content")) {
        req.session.user.site.blocks[req.param("blockIndex")].content.body = req.param('content');
        AM.updateTextBlock(req, function(e, o) {
            if(e) {
                res.send('error-updating-account', 400);
            } else {
                res.send('ok', 200);
            }
        });
    } else if (req.files) {
        // Get the uploaded byte data from /tmp/ folder on server
        //      (unix server only, make sure file permissions are set to be able to read /tmp/)
        fs.readFile(req.files.inputImg.path, function (err, data) {
            // Check error in uploading to server root!
            if (err) {
                res.send(err + " ===> postEdit: file upload: error while reading input image", 400);
            } else {
                var userContentPath = 'app/client/userContent/img'
                var newPath = userContentPath + '/' + req.files.inputImg.name;
                fs.writeFile(newPath, data, function (err) { 
                    if (err) {
                        throw err;
                    }
                    var newBlockObj = { "filename": 'userContent/img/' + req.files.inputImg.name };
                    req.session.user.site.blocks[req.param("blockIndex")].imgs.push(newBlockObj);
                    AM.updateGalleryBlock(req, function(e, o) {
                        if(e) {
                            console.log("big bad error");
                            res.send('error-updating-account', 400);
                        } else {
                            res.redirect('/');
                        }
                    });
                });
            }
        });
    }
        };