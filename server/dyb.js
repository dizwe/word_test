var AWS = require("aws-sdk");
AWS.config.loadFromPath('../.aws/config.json');
// AWS.config.update({
//   "region": "ap-northeast-2",
//   "AccessKeyId" : "AKIAJ6AFL4UBOI35B7QQ",
//   "SecretAccessKey" : "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",
// });
console.log(12);
var docClient = new AWS.DynamoDB.DocumentClient();

/////////////// READ
var params = {
  TableName:"word_test_db",
  Item:{
      "udatetime": "12",//(Date.now()+Math.random()*100).toString(),
      "word" : "secret",
      "mean": "비밀",
  }
};

docClient.put(params,function(err, data) {
       console.log(13);
       if (err) {
           console.error("Unable to add", ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:");
       }
    });
//
// /////////////// GET
//
// var params = {
//   TableName:"word_test_db",
//   Key:{
//       "udatetime": "12",//(Date.now()+Math.random()*100).toString(),
//   }
// };
// docClient.get(params,function(err, data) {
//        if (err) {
//            console.error("Unable to read",err);
//        } else {
//            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//        }
//     });

/////////////// update
// // 변수를집어넣고 어떤 값을리턴해\
// var params = {
//   TableName:"word_test_db",
//   Key:{
//       "udatetime": "12",//(Date.now()+Math.random()*100).toString(),
//   },
//   UpdateExpression : "set eg = :eg",
//   ExpressionAttributeValues :{
//     ":eg":["I'm happy"]
//   },
//   ReturnValues:"UPDATED_NEW"
// };
//
// console.log("Updating the item...");
// docClient.update(params, function(err, data) {
//     if (err) {
//         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });

///////// 증가 UpdateExpression
// var params = {
//     TableName:table,
//     Key:{
//         "year": year,
//         "title": title
//     },
//     UpdateExpression: "set info.rating = info.rating + :val",
//     ExpressionAttributeValues:{
//         ":val":1
//     },
//     ReturnValues:"UPDATED_NEW"
// };



/////////////// 조건부 update
// var params = {
//     TableName:table,
//     Key:{
//         "year": year,
//         "title": title
//     },
//     UpdateExpression: "remove info.actors[0]",
//     ConditionExpression: "size(info.actors) > :num",
//     ExpressionAttributeValues:{
//         ":num":3
//     },
//     ReturnValues:"UPDATED_NEW"
// };

/////////////// delete
// var params = {
//     TableName:table,
//     Key:{
//         "year":year,
//         "title":title
//     },
//     ConditionExpression:"info.rating <= :val",
//     ExpressionAttributeValues: {
//         ":val": 5.0
//     }
// };
// docClient.delete(params, function(err, data) {
//     if (err) {
//         console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });


/////////////////////////
////////////////////////////
//////////////////////////
//////////////////////////// 쿼리로 데이터 스캔하기
var params = {
    TableName : "word_test_db",
    KeyConditionExpression: "#yr = :yyyy", // keyCondition
    ExpressionAttributeNames:{ //year가 예약어라 따로 지정해야함
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1985
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});



/////////////// query 는 키 한정인듯(자주검색하는친구)
var params = {
    TableName : "Movies",
    // 보여줄 친구들 보여줘
    ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
    KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1992,
        ":letter1": "A",
        ":letter2": "L"
    }
};
docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
});
/////////////// scan (query는 미리 primary키로 찾고 보여주는건데 scan은일단 다 찾음
