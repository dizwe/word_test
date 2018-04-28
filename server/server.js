var AWS = require("aws-sdk");
AWS.config.loadFromPath('../.aws/config.json');
// AWS.config.update({
//   "region": "ap-northeast-2",
//   "AccessKeyId" : "AKIAJ6AFL4UBOI35B7QQ",
//   "SecretAccessKey" : "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",
// });
var docClient = new AWS.DynamoDB.DocumentClient();

var rightnow = new Date();
rightnow = rightnow.toISOString().slice(0,10).replace(/-/g,"");
// // ///////////// READ
// var params = {
//   TableName:"word_test_dydb",
//   Item:{
//       "udatetime": rightnow +'_'+Math.floor(Math.random()*100),
//       "seen" : 1,
//       "word" : "purview",
//       "mean": "the limit or range of one's control or activity",
//       "eg" : ["That issue is out of this court's purview"],
//       "written_date":parseInt(rightnow),
//   }
// };
//
// docClient.put(params,function(err, data) {
//        if (err) {
//            console.error("Unable to add", ". Error JSON:", JSON.stringify(err, null, 2));
//        } else {
//            console.log("PutItem succeeded:");
//        }
//     });


///////////// seen 3이하 40개 가장 최근 get
//시발안돼
// //////////
// var params = {
//   TableName:"word_test_dydb",
//   KeyConditionExpression : "seen < :letter1",
//   // FilterExpression:"mean=:haha",
//   ExpressionAttributeValues: {
//     ":letter1":2,
//     // ":haha":"비밀루",
//   }
// };
// docClient.query(params,function(err, data) {
//        if (err) {
//            console.error("Unable to read",err);
//        } else {
//            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//        }
//     });
//

// ////////// 2개 이하짜리 SCAN
// var params = {
//   TableName:"word_test_dydb",
//   FilterExpression : "seen < :num and written_date > :date1",
//   // FilterExpression:"mean=:haha",
//   ScanIndexForward:true,
//   ExpressionAttributeValues: {
//     ":num":2,
//     ":date1":20180400
//   }
// };
//
// docClient.scan(params,function(err, data) {
//        if (err) {
//            console.error("Unable to read",err);
//        } else {
//            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//        }
//     });


////////// 본 횟수늘리기
var params = {
    TableName:"word_test_dydb",
    Key:{
        "udatetime": "20180428_58",
    },
    UpdateExpression: "set seen = seen + :val",
    ExpressionAttributeValues:{
        ":val":1
    },
    ReturnValues:"UPDATED_NEW"
};

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
});
