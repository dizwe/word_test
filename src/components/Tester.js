import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Testing from '../routes/Testing';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NoMatch from '../routes/NoMatch';
import Input from '../routes/Input';



const propTypes = {
};
const defaultProps = {
};
class Tester extends Component {
    constructor(props) {
        super(props);
        this.state={
        };
    }


    render() {
        return(
            <div>
             <Router>
              <Switch>
                // 스마트 라우트에서 state를 가지고 있다가 다른 컴포넌트로 그걸 보내주고 하면 post같이 쓰이겠다
                <Route path="/input" render={() => (<Input/>)}/>
                <Route path="/test" render={() => (<Testing/> )}/>
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
