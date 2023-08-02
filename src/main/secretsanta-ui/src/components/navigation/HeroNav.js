import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { MDBIcon, MDBBtn, MDBNavItem, MDBNavLink } from 'mdbreact';

class HeroNav extends Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Row>
                        <Col xs={3} md={7}>
                            <MDBIcon icon="gifts" size="3x" />
                        </Col>
                        <Col xs={9} md={5}>
                            <Nav defaultActiveKey="/home" as="ul" className="justify-content-end">
                                <MDBNavItem>
                                    <MDBNavLink to="/joinagroup">Join A Group</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem>
                                    <MDBNavLink to="/viewyourgroup">View Your Group</MDBNavLink>
                                </MDBNavItem>
                                <Nav.Item as="li">
                                    <MDBBtn outline color="white" size="sm" onClick={this.props.modalToggle}>How it Works?</MDBBtn>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default HeroNav;