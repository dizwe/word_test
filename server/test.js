var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
var mongoose = require('mongoose');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var Bunch = require('./models/bunch.js');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mogod server");
});

var string_to_test_dict = require('../src/components/string_to_test_dict.js');
let test_string = `12
* 목토시  |  脖套  bó tào

* 설정  |  设置 shèzhì
c.f.设计  |  디자인
c.f.安装  |  설치하다

* 按钮  |  ànniǔ 통상적인 버튼

* 按键  |  핸드폰 버튼 ànjiàn]

* 辞职  |  사직하다
       c.f.推辞  |   tuīcí  거절하다  e.g. 一再推辞
       c.f.退休  |  퇴직하다
       c.f.跳槽  |  tiàocáo 다른 부서로 옮기다

* 애플이 돈 제일 많이 번다  |  苹果是赚钱最多的

* 고소하다  |  告状 gàozhuàng

* 프로그래머  |   程序员 chéngxùyuá
c.f.编程  biān chéng   프로그램짜다
c.f.编制  biānzhī엮다 짜다
c.f.变质  biànzhì 변질되다 abcd
c.f.编制  biānzhì편성하다, 작성하다
c.f.贬值  biǎnzhí 평가절하되다(폄치)

* 체면을 잃다  |  丢面子

* 서로 소통하다  |  互相沟通

* 佩服  |  pèifú 탄복하다, 감탄하다, 대단하다
e.g.佩服呀！ (쩌네- 부정적인 의미로도 쓰임) efgh

* 정의를 내리다  |  下定义
e.g.对一什么是网络，下定义很不容易

* 나랑 나이 비슷한 사람들은 취업 준비한다  |  跟我年龄差不多的人都在准备做工作。

* 诗  |  shī시

* 주관식  |  主观题
c.f.객관식  选择题 xuǎnzétí
* |

* |

* |

* |

* |

* |`;

mongoose.connect("mongodb://localhost/dizwe");

app.get('/bunches',(req,res,next)=>{
  var bunches = string_to_test_dict(test_string);

  Bunch.insertMany(bunches, function(err, bunch){
      if(err) return console.log(err);
      console.dir(bunch);// ???
  });
  // var bunch = new Bunch({
  //   word : "배고프다",
  //   mean : "I'm hungry",
  //   eg:["I'm fuckin hungry", "hungry 정신"],
  //   cf:["배부르다  |  full"]
  // });
  // bunch.(function(err, bunch){
  //   if(err) return console.log(err);
  //   console.dir(bunch);// ???
  // });
});


var server = app.listen(port, function(){
  console.log("NOW LISTEN");
});
