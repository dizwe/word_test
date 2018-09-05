module.exports = function(test_string){
  // 한 번치 분리
  let _splited_string = test_string.split('*');
  let bunch = _splited_string.filter(x=>x.search(/[^123|\:> \t↵\n]/)!=-1&&x.length>=5);

  // 번치에서 단어 분리
  // 첫번째로 나오는 | 만 파싱하기 위해 split 말고 indexOf를 사용함
  // index 없으면? -1
  let _spliting_bunch_index = bunch.map(x=>x.indexOf('|'));
  let trimmed_bunchs = [];
  let [word, mean, cf, eg] = ["",[],[],[]];

  for(let i=0; i<bunch.length; i++){
    // :를 slice로 생각해야 하는군... 쳇
    word = bunch[i].slice(0,_spliting_bunch_index[i]?_spliting_bunch_index[i]:bunch.length);
    // |를 안적은 경우에는 etc를 아예 빈칸으로 둠.
    let etc = bunch[i].slice(_spliting_bunch_index[i]?_spliting_bunch_index[i]+1:bunch[i].length);

    let splited_etc = etc.split(/(e.g.|c.f.)/g);
    //e.g./ c.f.가 있으면 그 다음에 실제 내용이 이을거라 가정하고 만ㄷ
    mean = splited_etc[0];
    for (let idx = 0 ; idx<splited_etc.length; idx++){
  	    if(splited_etc[idx].indexOf('e.g.')!=-1){
  		    eg.push(splited_etc[idx+1]);
        }else if(splited_etc[idx].indexOf('c.f.')!=-1){
          cf.push(splited_etc[idx+1]);
        }
      }

    trimmed_bunchs.push({'word':word,'mean':mean, 'cf':cf, 'eg':eg});
  }

  return trimmed_bunchs;
};
