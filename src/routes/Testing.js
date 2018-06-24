import React, { Component} from 'react';
import PropTypes from 'prop-types';
const propTypes = {
};
const defaultProps = {
};
class Testing extends Component {
    constructor(props) {
        super(props);
        this.state={
          studying_num:0,
        };
        this.next_word = this.next_word.bind(this);
        this.prev_word = this.prev_word.bind(this);
        this.selected_word = this.selected_word.bind(this);
        this.mapWordList = this.mapWordList.bind(this);
    }

    prev_word(){
      if(0<this.state.studying_num){
        this.setState({
          studying_num:this.state.studying_num-1
        });
      }else{alert('첫 단어');}
      //뭘 했던지간에 다시 안보이는 상태로 만들어야함
      this.props.ModeToFalse();
    }

    next_word(){
      // 자료보다 많으면 안되네까
      if(this.state.studying_num<this.props.trimmed_bunchs.length-1){
        this.setState({
          studying_num:this.state.studying_num+1
        });
      }else{alert('마지막 단어');}
      this.props.ModeToFalse();
    }

    selected_word(e){
      console.log(e.target.value);
      this.setState({
        studying_num:e.target.value,
      });
      this.props.ModeToFalse();
    }

    mapWordList(){
      let word_list=[];
      for(let i=0;i<this.props.trimmed_bunchs.length;i++){
        let adding_list = (
            <li key={i} value={i} onClick={this.selected_word}>{this.props.trimmed_bunchs[i]['word']}</li>);
        word_list.push(adding_list);
      }

      return word_list;
    }

    render() {
      console.log(this.props.trimmed_bunchs[0]['word']);
      let show_meaning_p =(
        <p>
          <li>{this.props.trimmed_bunchs[this.state.studying_num]['word']}</li>
          <li>{this.props.trimmed_bunchs[this.state.studying_num]['mean']}</li>
        </p>
        );
      let no_meaning_p = (
        <p>
          <li>{this.props.trimmed_bunchs[this.state.studying_num]['word']}</li>
        </p>);
      return(
          <div>
          <div className="inline">
            {this.props.show_mode? show_meaning_p:no_meaning_p}
            <button onClick ={this.prev_word}>PREV</button>
            <button onClick ={this.next_word}>NEXT</button>
            <button onClick ={()=>this.props.onChangeMode()}>SHOW</button>
          </div>
          <div>
            <h1>[단어 목록]</h1>
            {this.mapWordList()}
          </div>
          </div>
      );
    }
}
Testing.propTypes = propTypes;
Testing.defaultProps = defaultProps;
export default Testing;
