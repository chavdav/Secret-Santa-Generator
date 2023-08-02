import React, { Component } from 'react';
import HeroNav from '../navigation/HeroNav';
import { MDBJumbotron, MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBAnimation } from 'mdbreact';
import {HashLink as Link} from 'react-router-hash-link';

class HeroSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            apiTestResponse: ''
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="hero-section">
                <MDBAnimation type="fadeIn" duration="1s">
                    <MDBJumbotron fluid>
                        <MDBAnimation type="fadeIn" duration="1s" delay="1s">
                            <MDBContainer>
                                <HeroNav modalToggle={this.toggle} />
                                <MDBRow className="hero-text-positioning" style={{ marginTop: '10%', textAlign: 'center' }}>
                                    <MDBCol xs={0} md={5}>

                                    </MDBCol>

                                    <MDBCol xs={12} md={7}>
                                        <h1>Secret Santa Generator</h1>
                                        <hr></hr>
                                        <h3>Create your own Secret Santa group!</h3>
                                        <p>If your group of family and friends is trying to setup the perfect way to run your secret santa group, you've come to the right place!</p>
                                        <MDBBtn rounded outline color="white" style={{ marginTop: '2%' }}><Link to="/#getstarted" className="getstartedlink">Get Started</Link><MDBIcon icon="gift" style={{ marginLeft: '5px' }} /> </MDBBtn>
                                    </MDBCol>

                                </MDBRow>
                            </MDBContainer>
                        </MDBAnimation>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader toggle={this.toggle}><span style={{ color: 'black' }}>How It Works</span></MDBModalHeader>
                            <MDBModalBody>
                                <span style={{ color: 'black' }}>Our service will create a secret santa group for you. Your family and friends will then be able to join via a shareable link or a code. Then, on a date that you determine, the users will be notified of who their recipients
                                are via email or text. That's it! We hope our gift to you will make the holidays slighty easier.
                                <br></br>
                                <br></br>
                                Happy Holidays!
                            </span>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn color="danger" onClick={this.toggle}>Close</MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBJumbotron>
                </MDBAnimation>
            </div>
        );
    }
}

export default HeroSection;
