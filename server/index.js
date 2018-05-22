console.log('Loading function');

var mongoose = require('mongoose');
var Bunch = require('./models/bunch.js');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mogod server");
});
//test db로 접속해라
mongoose.connect(process.env.db_url);


exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const operation = event.http_method;

    switch (operation) {
        // case 'POST':
        //     var replaced_hi = event.bunch.replace(/'/g,'"');
        //     payload.Item = JSON.parse(replaced_hi);
        //     return dynamo.putItem(payload, callback);
        //     // break;
        case 'GET':
            Bunch.find({"seen":{$lte:3}})
            .sort({"written_date":1})
            .limit(30)
            .exec(function(err, bunch) {
                if(err)
              return callback(null,bunch);
            });
            break;
        // case 'PUT':
        //     dynamo.updateItem(payload, callback);
        //     break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }
};
