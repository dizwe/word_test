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
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
const propTypes = {
};
const defaultProps = {
};
class Tester extends Component {
    constructor(props) {
        super(props);
        this.state={
          isOpen: false
        };
        this.toggle= this.toggle.bind(this);
    }

    toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
    }

    render() {
        return(
            <div>
            <Container>
            <Row>
              <Col xs="12">
              <Navbar color="dark" dark expand="md">
                <NavbarBrand>word_test</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/input/">ADD WORD</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/test/">WORD TEST</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
            </Row>

              <Row>
              <Col sm={{ size: 10, offset: 1 }}>
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
