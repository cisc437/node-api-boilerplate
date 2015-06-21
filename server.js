var http = require('http');
var express = require('express');
var mysql = require('mysql');

var router = express();
var server = http.createServer(router);

var USERNAME = "andynovo";
var PORT = "47476";
var PWD = USERNAME.split('').reverse().join('');

var con = mysql.createConnection({
  host : "orioles1",
  user : USERNAME,
  password : PWD,
  database : USERNAME
});

con.connect();

router.get('/', function(req, res){
  con.query("Select * from bananas", function(err, rows, fields){
    if (!err){
      res.json(rows);
    } else {
      res.json({error: "SQL failed"});
    }
  });
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


server.listen(PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
