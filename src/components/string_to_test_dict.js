// let test_string = `12
// * 목토시  |  脖套  bó tào
//
// * 설정  |  设置 shèzhì
// c.f.设计  |  디자인
// c.f.安装  |  설치하다
//
// * 按钮  |  ànniǔ 통상적인 버튼
//
// * 按键  |  핸드폰 버튼 ànjiàn]
//
// * 辞职  |  사직하다
//        c.f.推辞  |   tuīcí  거절하다  e.g. 一再推辞
//        c.f.退休  |  퇴직하다
//        c.f.跳槽  |  tiàocáo 다른 부서로 옮기다
//
// * 애플이 돈 제일 많이 번다  |  苹果是赚钱最多的
//
// * 고소하다  |  告状 gàozhuàng
//
// * 프로그래머  |   程序员 chéngxùyuá
// c.f.编程  biān chéng   프로그램짜다
// c.f.编制  biānzhī엮다 짜다
// c.f.变质  biànzhì 변질되다 abcd
// c.f.编制  biānzhì편성하다, 작성하다
// c.f.贬值  biǎnzhí 평가절하되다(폄치)
//
// * 체면을 잃다  |  丢面子
//
// * 서로 소통하다  |  互相沟通
//
// * 佩服  |  pèifú 탄복하다, 감탄하다, 대단하다
// e.g.佩服呀！ (쩌네- 부정적인 의미로도 쓰임) efgh
//
// * 정의를 내리다  |  下定义
// e.g.对一什么是网络，下定义很不容易
//
// * 나랑 나이 비슷한 사람들은 취업 준비한다  |  跟我年龄差不多的人都在准备做工作。
//
// * 诗  |  shī시
//
// * 주관식  |  主观题
// c.f.객관식  选择题 xuǎnzétí
// * |
//
// * |
//
// * |
//
// * |
//
// * |
//
// * |`;
module.exports = function(test_string){
  // 한 번치 분리
  let _splited_string = test_string.split('*');
  let bunch = _splited_string.filter(x=>x.search(/[^123| \n]/)!=-1);

  // 번치에서 단어 분리
  // 첫번째로 나오는 | 만 파싱하기 위해 split 말고 indexOf를 사용함
  // index 없으면? -1
  let _spliting_bunch_index = bunch.map(x=>x.indexOf('|'));
  let trimmed_bunchs = [];
  let [word, mean, cf, eg] = ["",[],[],[]];

  for(let i=0; i<bunch.length; i++){
    // :를 slice로 생각해야 하는군... 쳇
    word = bunch[i].slice(0,_spliting_bunch_index[i]);
    let etc = bunch[i].slice(_spliting_bunch_index[i]+1);
    let splited_etc = etc.split(/\n/g);
    mean = splited_etc[0];
    cf = splited_etc.filter(x=>x.indexOf('c.f.')!=-1).map(x=>x.replace('c.f.',''));
    eg = splited_etc.filter(x=>x.indexOf('e.g.')!=-1).map(x=>x.replace('e.g.',''));

    trimmed_bunchs.push({'word':word,'mean':mean, 'cf':cf, 'eg':eg});
  }

  return trimmed_bunchs;
}
