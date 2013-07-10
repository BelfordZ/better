var AM = require('../account-manager');

module.exports.getUserSite = function(req, res) {
  var userQ = req.url.substr(1); //removes leading slash
  console.log(userQ);
  AM.getSiteObject(userQ, function(o) {
    if (o!=null) {
      var siteBlockIDs = o.site.blocks;
      var numBlocks = siteBlockIDs.length;
      res.send(o, 200);
    } else {
      console.log("site loading failed");
    }
  });
};