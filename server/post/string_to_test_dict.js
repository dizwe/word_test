module.exports = function(test_string){
  // 한 번치 분리
  let _splited_string = test_string.split('*');
  let bunch = _splited_string.filter(x=>x.search(/[^123| :>]/)!=-1);

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
    let splited_etc = etc.split(/:>/g);
    mean = splited_etc[0];
    cf = splited_etc.filter(x=>x.indexOf('c.f.')!=-1).map(x=>x.replace('c.f.',''));
    eg = splited_etc.filter(x=>x.indexOf('e.g.')!=-1).map(x=>x.replace('e.g.',''));

    trimmed_bunchs.push({'word':word,'mean':mean, 'cf':cf, 'eg':eg});
  }

  return trimmed_bunchs;
};
