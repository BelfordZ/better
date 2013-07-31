var AM = require('../account-manager');
var fs = require('fs');

module.exports.postUploadImage = function(req, res) {
    console.log(req.param("linkType"));
    // Get the uploaded byte data from /tmp/ folder on server
    //      (unix server only, make sure file permissions are set to be able to read /tmp/)
    fs.readFile(req.files.inputImg.path, function (err, data) {
        // Check error in uploading to server root!

        if (err) {
            res.send(err + " ===> postEdit: file upload: error while reading input image", 400);
        } else {
            var userContentPath = 'app/client/userContent/' + req.session.user.user + '/img'
            var newPath = userContentPath + '/' + req.files.inputImg.name;
            fs.writeFile(newPath, data, function (err) { 
                if (err) {
                    throw err;
                }
                var newBlockObj = { 
                    "filename": 'userContent/' + req.session.user.user + '/img/' + req.files.inputImg.name 
                };
                req.session.user.site.blocks[req.param("linkIndex")].content.img = newBlockObj;
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
};
