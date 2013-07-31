var AM = require('../account-manager');
var fs = require('fs');

module.exports.postUploadText = function(req, res) {
    if (req.param('blockType') === "block1") {
        req.session.user.site.blocks[req.param("blockIndex")].content.date = req.param('date');
        req.session.user.site.blocks[req.param("blockIndex")].content.body = req.param('body');
        
        AM.updateFromSession(req, function(e, o) {
            if(e) {
                res.send('error-updating-account', 400);
            } else {
                res.send('ok', 200);
            }
        });
    }
};