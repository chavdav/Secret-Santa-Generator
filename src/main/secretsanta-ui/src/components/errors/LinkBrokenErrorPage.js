import React, { Component } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBNavLink, MDBAnimation } from 'mdbreact';

class LinkBrokenErrorPage extends Component {
    render() {
        return (
            <div>
                <MDBAnimation type="fadeIn" duration="0.5s">
                    <MDBContainer>
                        <h4 style={{ textAlign: 'center', marginTop: '5%' }}>Oops!</h4>
                        <MDBRow style={{ marginTop: '5%' }}>
                            <MDBCol md="12">
                                <h5>There seems to be a problem...</h5>
                                <p>Unfortunately, the link you are trying to choose is not working properly or does not exist!</p>
                                <p>You can use the following link to manually join: <MDBNavLink to="/joinagroup">Join A Group</MDBNavLink></p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBAnimation>
            </div>
        );
    }
}

export default LinkBrokenErrorPage;