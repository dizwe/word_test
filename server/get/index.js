console.log('Loading function');
var mongoose = require('mongoose');
var Bunch = require('./models/bunch.js');
var db = mongoose.connection;
console.log(process.env.db_url);

exports.handler = (event, context, callback) => {
    //test db로 접속해라
    mongoose.connect(process.env.db_url);
    const operation = event.http_method;
    console.log(operation);
    db.once('open', function(){
       Bunch.find({"seen":{$lte:3}})
        .sort({"written_date":1})
        .limit(30)
        .exec(function(err, bunch) {
            mongoose.connection.close();
            if(err) console.log(err);
            else callback(null,bunch);
        });
    });
};
