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
    // if the update was re-ordering the blocks
    if (req.param('startIndex') && req.param('finishIndex')) {        
        if (req.param('startIndex') == req.param('finishIndex')) {
            res.send('ok', 200);
        } else {
            var blocks = req.session.user.site.blocks;            
            var posToMoveFrom = req.param('startIndex');
            var posToMoveTo = req.param('finishIndex');            
            var blockToMove = blocks[req.param('startIndex')];
            
            if (posToMoveTo == blocks.length-1) {
                console.log("moving to last pos");
                blocks.push(blockToMove);
                blocks.splice(posToMoveFrom, 1);                
            } else if (posToMoveTo == 0) {
                console.log("moving to pos 0");
                blocks.splice(posToMoveFrom, 1);
                blocks.splice(0, 0, blockToMove);                                
            } else if (posToMoveTo < posToMoveFrom) {
                console.log("to is less than from");
                blocks.splice(posToMoveFrom, 1); 
                blocks.splice(posToMoveTo, 0, blockToMove);
                //blocks.splice(posToMoveFrom+1, 1);                
            }  else if (posToMoveFrom == 0) {
                console.log("from pos 0");
                blocks.splice(posToMoveFrom, 1);
                blocks.splice(posToMoveTo, 0, blockToMove);                
            } else {
                console.log("other");
                blocks.splice(posToMoveTo+1, 0, blockToMove);
                blocks.splice(posToMoveFrom, 1);                
            }
            req.session.user.site.blocks = blocks;
            
            AM.updateFromSession(req, function(e, o) {
                if(e) {
                    console.log("ERROR:" + e);
                    res.send('error-updating-account', 400);
                } else {
                    res.send('ok', 200);        
                }
            });
        }
    }
};
