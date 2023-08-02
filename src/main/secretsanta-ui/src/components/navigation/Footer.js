import React, { Component } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

class Footer extends Component {
    render() {
        return (
            <MDBFooter color="green darken-4" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center">
                    <MDBRow>
                        <MDBCol md="12">
                            <h5 className="title">Thanks for using our Generator!</h5>
                            <p>Happy Holidays!</p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="#!"> Secret-Santa-321 </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        );
    }
}

export default Footer;