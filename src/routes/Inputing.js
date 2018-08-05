// {}하는 이유?
import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {FormGroup, Input} from 'reactstrap';
import { Button } from 'reactstrap';
import '../css/Inputing.css';

const invoke_url= 'https://9vw3fq4trj.execute-api.ap-northeast-2.amazonaws.com/word_test_api';
class Inputing extends Component{
  constructor(props){
    // 이거의 의미는 뭘까
    super(props);
    //check는 input으로있을지 test 옮길지 결정해줌
    this.state={
      text : "",
      check:true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

// event 있는거랑없는거랑
  handleChange(event){
    this.setState({
      text : event.target.value,
    });
  }

  handleClick(){
    // check false로 바꾸고 받은 string post하기
    this.setState({
      check : false,
    });
    var text = this.state.text;
    let changed_text = text.replace(/\n/g,":>");
    changed_text = changed_text.replace(/\t/g,"\\t");

    axios.post(invoke_url+'/bunches',{
      test_string: changed_text,
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render(){
    return (
      <div>
        <FormGroup>
          <Input className="input-box" onChange = {this.handleChange} value = {this.state.text} type="textarea" />
          <a className ="submit-button" onClick = {this.handleClick}><Button color="secondary">Submit</Button></a>
        </FormGroup>
        {!this.state.check? <Redirect to='/test'/>:""}
      </div>
    );
  }
}


//default 의미가 뭐지
export default Inputing;
