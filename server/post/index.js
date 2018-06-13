console.log('Loading function');
var mongoose = require('mongoose');
var Bunch = require('./models/bunch.js');
var db = mongoose.connection;
console.log(process.env.db_url);
var string_to_test_dict = require('./string_to_test_dict.js');

exports.handler = (event, context, callback) => {
    //test db로 접속해라
    mongoose.connect(process.env.db_url);

    db.once('open', function(){
       var bunches = string_to_test_dict(event.test_string);

      Bunch.insertMany(bunches, function(err, bunch){
          mongoose.connection.close();
          if(err) return console.log(err);
          return callback(null, bunch);
      });
    });
};
