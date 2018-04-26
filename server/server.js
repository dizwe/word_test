var AWS = require("aws-sdk");
AWS.config.loadFromPath('../.aws/config.json');
// AWS.config.update({
//   "region": "ap-northeast-2",
//   "AccessKeyId" : "AKIAJ6AFL4UBOI35B7QQ",
//   "SecretAccessKey" : "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",
// });
console.log(12);
var docClient = new AWS.DynamoDB.DocumentClient();

var rightnow = new Date();
/////////////// READ
// var params = {
//   TableName:"word_test_dyb",
//   Item:{
//       "udatetime": (Date.now()+Math.floor(Math.random()*100)).toString(),
//       "seen" : "0",
//       "word" : "secrett",
//       "mean": "비밀루",
//       "eg" : [],
//       "date": rightnow.toISOString().slice(0,10).replace(/-/g,""),
//   }
// };
//
// docClient.put(params,function(err, data) {
//        console.log(13);
//        if (err) {
//            console.error("Unable to add", ". Error JSON:", JSON.stringify(err, null, 2));
//        } else {
//            console.log("PutItem succeeded:");
//        }
//     });


/////////////// seen 3이하 40개 가장 최근 get
var params = {
  TableName:"word_test_dyb",
  KeyConditionExpression:"seen=:maxi",
  FilterExpression:"mean=:haha",
  ExpressionAttributeValues: {
    ":maxi":"0",
    ":haha":"비밀루",
  }
};
docClient.query(params,function(err, data) {
       if (err) {
           console.error("Unable to read",err);
       } else {
           console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
       }
    });
