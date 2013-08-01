var AM = require('../account-manager');
var fs = require('fs');

module.exports.postUploadText = function(req, res) {
    console.log(req.param('blockType'));
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
    } else if (req.param('blockType') === "block2") {
        req.session.user.site.blocks[req.param("blockIndex")].content.venueName = req.param('venueName');
        req.session.user.site.blocks[req.param("blockIndex")].content.address = req.param('address');
        req.session.user.site.blocks[req.param("blockIndex")].content.events = req.param('events');
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