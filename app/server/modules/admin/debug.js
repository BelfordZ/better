module.exports.sessions = function(req, res) {
  var response = "<h1>Session Information</h1>";
  response += "<h4>req.session.user</h4><code>";
  response += JSON.stringify(req.session.user);
  response += "</code><h4>req.cookies.user</h4><code>";
  response += req.cookies.user;
  response += "</code>";
  res.send(response);
};