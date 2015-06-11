var http = require('http');
var express = require('express');

var router = express();
var server = http.createServer(router);

router.get('/', function(req, res){
  res.json({andy:"rules"});
});

router.route('/news/:newsid')
.get(function (req, res) {
  res.json({requested:req.params.newsid});
})
.put(function(req, res){
  res.json({updated: req.params.newsid});
})
.delete(function(req, res){
  res.send("deleted article "+req.params.newsid);
});

router.post('/news/', function(req, res){
  res.send("Should have created a news article... instead I sent this message");
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
