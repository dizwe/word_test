console.log('Loading function');
var mongoose = require('mongoose');
var Bunch = require('./models/bunch.js');
var db = mongoose.connection;
console.log(process.env.db_url);

exports.handler = (event, context, callback) => {
    //test db로 접속해라
    mongoose.connect(process.env.db_url);
    db.once('open', function(){
        console.log(111);
        console.log(event.bunch_id);
     Bunch.update({_id:event.bunch_id},{$inc:{seen:1}},
     function(err, bunch){
        console.log(bunch);
      mongoose.connection.close();
      if(err) return console.log(err);
      return callback(null, bunch);
  });
    });
};
