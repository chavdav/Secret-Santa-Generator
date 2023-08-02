import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBNavLink, MDBCol, MDBTable, MDBTableBody, MDBTableHead, MDBAnimation } from 'mdbreact';

class JoinAGroupSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewGroupLink: ''
        }
    }

    componentDidMount() {
      this.setState({
        viewGroupLink: "/viewyourgroup/" + encodeURIComponent(this.props.groupname) + "/" + encodeURIComponent(this.props.grouppass)
      });
    }

    render() {
        return (
            <div>
                <MDBContainer style={{ marginTop: '5%', marginBottom: '10%' }}>
                    <MDBAnimation type="fadeIn" duration="1s">
                        <MDBRow>
                            <MDBCol>
                                <h3>Thanks for joining {this.props.groupname}, {this.props.username}!</h3>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ marginTop: '5%' }}>
                            <MDBCol md="12" style={{ textAlign: 'center' }}>
                                <h4>Some Info About the Group</h4>
                                <hr></hr>
                                <p>Here is some more information about your group. Here you can see information such as the recipient release date, and the max amount of money to spend on a gift!</p>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                    <MDBAnimation type="fadeIn" duration="1s" delay="0.5s">
                        <MDBRow style={{ marginTop: '10%' }}>
                            <MDBCol md="12">
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Release Date</th>
                                            <th>Max Amount to Spend</th>
                                            <th>Other Members?</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            <td>{this.props.groupreleasedate}</td>
                                            <td>${this.props.groupmaxamount}</td>
                                            <td><MDBNavLink to={this.state.viewGroupLink}>Click Here!</MDBNavLink></td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                </MDBContainer>
            </div>
        );
    }
}

export default JoinAGroupSuccess;
