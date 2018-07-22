import React, { Component} from 'react';
import PropTypes from 'prop-types';
import string_to_test_dict from '../components/string_to_test_dict';
import axios from 'axios';
const invoke_url= 'https://9vw3fq4trj.execute-api.ap-northeast-2.amazonaws.com/word_test_api';
const propTypes = {
};
const defaultProps = {
};
class Testing extends Component {
    constructor(props) {
        super(props);
        this.state={
          show_mode:false,
          trimmed_bunches:[],
          studying_num:0,
        };

        this.next_word = this.next_word.bind(this);
        this.prev_word = this.prev_word.bind(this);
        this.idn = this.idn.bind(this);
        this.selected_word = this.selected_word.bind(this);
        this.mapWordList = this.mapWordList.bind(this);
        //
        this.handle_change_mode=this.handle_change_mode.bind(this);
        this.mode_to_false = this.mode_to_false.bind(this);
    }

    handle_change_mode(){
      this.setState({
        show_mode:!(this.state.show_mode),
      });
    }

    mode_to_false(){
      this.setState({
        show_mode:false,
      });
    }

    componentDidMount(){
      console.log("componentDidMount");
      let that = this;
      axios.get(invoke_url+'/bunches')
      .then(function(response) {
        that.setState({
          trimmed_bunches : response.data,
        });
        return response;
      })
      .catch( (error) =>{
        console.log(error);
      });
    }

    prev_word(){
      if(0<this.state.studying_num){
        this.setState({
          studying_num:this.state.studying_num-1
        });
      }else{alert('첫 단어');}
      //뭘 했던지간에 다시 안보이는 상태로 만들어야함
      this.mode_to_false();
    }

    next_word(){
      // 자료보다 많으면 안되네까
      if(this.state.studying_num<this.state.trimmed_bunches.length-1){
        this.dt = JSON.stringify({"bunch_id": this.state.trimmed_bunches[this.state.studying_num]._id});
        axios.put(invoke_url+'/bunches',this.dt).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        this.setState({
          studying_num:this.state.studying_num+1
        });
      }else{alert('마지막 단어');}
      this.mode_to_false();
    }

    idn(){
      console.log( this.state.trimmed_bunches[this.state.studying_num]._id);
        axios.put('https://9vw3fq4trj.execute-api.ap-northeast-2.amazonaws.com/word_test_api/bunches/idn',{
          bunch_id: this.state.trimmed_bunches[this.state.studying_num]._id,
        }).then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    selected_word(e){
      // 고른 단어로 바로 넘어가기
      console.log(e.target.value);
      this.setState({
        studying_num:e.target.value,
      });
      this.mode_to_false();
    }

    mapWordList(){
      let word_list=[];
      for(let i=0;i<this.state.trimmed_bunches.length;i++){
        let adding_list = (
            <li key={i} value={i} onClick={this.selected_word}>{this.state.trimmed_bunches[i].word}</li>);
        word_list.push(adding_list);
      }

      return word_list;
    }

    render() {
      if(this.state.trimmed_bunches.length!=0){
      let show_meaning_p =(
        <p>
          <li>{this.state.trimmed_bunches[this.state.studying_num].word}</li>
          <li>{this.state.trimmed_bunches[this.state.studying_num].mean}</li>
        </p>
        );
      let no_meaning_p = (
        <p>
          <li>{this.state.trimmed_bunches[this.state.studying_num].word}</li>
            <li>{this.state.trimmed_bunches[this.state.studying_num].seen}</li>
        </p>);

      let idn_button = (
              <button onClick = {this.idn}>IDN</button>);


      return(
          <div>
          <div className="inline">
            {this.state.show_mode? show_meaning_p:no_meaning_p}
            <button onClick ={this.prev_word}>PREV</button>
            <button onClick ={this.next_word}>NEXT</button>
            <button onClick ={()=>this.handle_change_mode()}>SHOW</button>
            {this.state.trimmed_bunches[this.state.studying_num].seen>=3?idn_button:""}
          </div>
          <div>
            <h1>[단어 목록]</h1>
            {this.mapWordList()}
          </div>
          </div>
      );
    }else{
      return(<div><p>WATING...</p></div>);
    }
  }
}
Testing.propTypes = propTypes;
Testing.defaultProps = defaultProps;
export default Testing;
