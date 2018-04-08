import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Testing from '../routes/Testing';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NoMatch from '../routes/NoMatch';
import string_to_test_dict from './string_to_test_dict';
import Input from '../routes/Input';
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
    }

    handle_change_mode(){
      this.setState({
        show_mode:!(this.state.show_mode),
      })
    }

    handle_post_text(text){
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
            <h>{this.state.text2}</h>
             <Router>
              <Switch>
                // 스마트 라우트에서 state를 가지고 있다가 다른 컴포넌트로 그걸 보내주고 하면 post같이 쓰이겠다
                <Route path="/input" render={() => (
                   <Input onPostText={this.handle_post_text} /> )}/>
                <Route path="/test" render={() => (
                  <Testing show_mode={this.state.show_mode}
                     onChangeMode = {this.handle_change_mode}
                     ModeToFalse = {()=>this.setState({show_mode:false})}
                     trimmed_bunchs={this.state.trimmed_bunchs}/> )}/>
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
