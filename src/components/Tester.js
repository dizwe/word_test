import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Testing from '../routes/Testing';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NoMatch from '../routes/NoMatch';
import string_to_test_dict from './string_to_test_dict';
import Input from '../routes/Input';
import axios from 'axios';

const invoke_url= 'https://9vw3fq4trj.execute-api.ap-northeast-2.amazonaws.com/word_test_api';

const propTypes = {
};
const defaultProps = {
};
class Tester extends Component {
    constructor(props) {
        super(props);
        this.state={
          show_mode:false,
          trimmed_bunchs:[],
        };
        this.handle_change_mode=this.handle_change_mode.bind(this);
        this.handle_post_text = this.handle_post_text.bind(this);
        this.get_trimmed_bunches = this.get_trimmed_bunches.bind(this);
    }

    handle_change_mode(){
      this.setState({
        show_mode:!(this.state.show_mode),
      });
    }

    get_trimmed_bunches(){
      axios.get(invoke_url+'/bunches',{
      }).then(function (response) {
        console.log(response);
        return response;
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    handle_post_text(text){
      let changed_text = text.replace(/\n/g,":>");
      changed_text = changed_text.replace(/\t/g,"\\t");
      
      axios.post(invoke_url+'/bunches',{
        test_string: changed_text,
      }).then(function (response) {
        console.log(1234);
        console.log(response);
      })
      .catch(function (error) {
        console.log(4565);
        console.log(error);
      });

      this.setState({
        trimmed_bunchs:string_to_test_dict(text),
        show_mode:false, //그냥 다시 한번 설정하는거다. setstate는 통째로 하는거니까
      });
    }

    render() {
      //
      console.log(this.state);
        return(
            <div>
             <Router>
              <Switch>
                // 스마트 라우트에서 state를 가지고 있다가 다른 컴포넌트로 그걸 보내주고 하면 post같이 쓰이겠다
                <Route path="/input" render={() => (
                   <Input onPostText={this.handle_post_text} /> )}/>
                <Route path="/test" render={() => (
                  <Testing show_mode={this.state.show_mode}
                     onChangeMode = {this.handle_change_mode}
                     ModeToFalse = {()=>this.setState({show_mode:false})}
                     trimmed_bunchs={this.get_trimmed_bunches()}/> )}/>
                <Route component={NoMatch}/>
              </Switch>
              </Router>
            </div>
        );
    }
}

Tester.propTypes = propTypes;
Tester.defaultProps = defaultProps;
export default Tester;
