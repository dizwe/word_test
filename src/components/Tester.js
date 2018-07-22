import React, { Component} from 'react';
import PropTypes from 'prop-types';
import Testing from '../routes/Testing';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NoMatch from '../routes/NoMatch';
import Input from '../routes/Inputing';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Button} from 'reactstrap';
import {Container, Row, Col } from 'reactstrap';

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
            <Container>
            <Row>
            <Col sm="3"><Button color="warning">word_test</Button></Col>
             <Col sm="9">
             <Breadcrumb>
               <BreadcrumbItem active><a href="#">Add Word</a></BreadcrumbItem>
               <BreadcrumbItem active><a href="#">Word Test</a></BreadcrumbItem>
             </Breadcrumb>
            </Col>
              </Row>

              <Row>
              <Col>
             <Router>
              <Switch>
                // 스마트 라우트에서 state를 가지고 있다가 다른 컴포넌트로 그걸 보내주고 하면 post같이 쓰이겠다
                <Route path="/input" render={() => (<Input/>)}/>
                <Route path="/test" render={() => (<Testing/> )}/>
                <Route component={NoMatch}/>
              </Switch>
              </Router>
              </Col>
              </Row>
             </Container>
            </div>
        );
    }
}

Tester.propTypes = propTypes;
Tester.defaultProps = defaultProps;
export default Tester;
