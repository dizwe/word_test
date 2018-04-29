var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var Bunch = require('./models/bunch.js');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mogod server");
});
//test db로 접속해라
var config = require('../config/config.js');
mongoose.connect(config.db_url);


var string_to_test_dict = require('../src/components/string_to_test_dict.js');

// 3이하의 30개 이하 오래된 순서대로
app.get('/bunches',(req,res,next)=>{
    Bunch.find({"seen":{$lte:3}})
    .sort({"written_date":1})
    .limit(30)
    .exec(function(err, bunch) {
      res.json(bunch);
    });

});

//test_string 들어오면 변형해서 집어넣기
app.post('/bunches',(req,res,next)=>{
  var bunches = string_to_test_dict(req.body.test_string);

  Bunch.insertMany(bunches, function(err, bunch){
      if(err) return console.log(err);
      return res.json(bunch);
  });
});

//본 횟수 늘리기
app.put('/bunches/:bunch_id',(req,res,next)=>{
  var hi = {_id:req.param.bunch_id};
  Bunch.update({_id:req.param.bunch_id},{$inc:{seen:1}}, function(err, bunch){
      if(err) return console.log(err);
      return res.json(bunch);
  });
});

//3 이상일때 모른다고 하면 2로 바꾸기
app.put('/bunches/idn/:bunch_id',(req,res,next)=>{
  var hi = {_id:req.param.bunch_id};
  Bunch.update({_id:req.param.bunch_id},{$inc:{seen:-1}}, function(err, bunch){
      if(err) return console.log(err);
      return res.json(bunch);
  });
});


var server = app.listen(port, function(){
  console.log("NOW LISTEN");
});
