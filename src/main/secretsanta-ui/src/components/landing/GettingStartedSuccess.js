import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBAnimation, MDBTableHead, MDBTableBody, MDBTable, MDBInput, MDBBtn } from 'mdbreact';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class GettingStartedSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupShareLink: '',
            copyToClipboard: '',
            copyText: 'Copy',
            disableBtn: true
        }
    }

    componentDidMount() {
        const groupNameForLink = this.props.groupname;
        const groupPassForLink = this.props.grouppass;

        this.setState({
            disableBtn: false,
            groupShareLink: "Join my Secret Santa Group! - http://secret-santa-321.herokuapp.com/#/joinagroup/share/" + groupNameForLink + "/" + groupPassForLink
        });
    }


    render() {
        return (
            <div>
                <MDBContainer style={{ marginTop: '5%', marginBottom: '10%' }}>
                    <MDBAnimation type="fadeIn" duration="1s">
                        <MDBRow style={{ marginTop: '5%' }}>
                            <MDBCol md="12" style={{ textAlign: 'center' }}>
                                <h3>Thanks for creating {this.props.groupname}, {this.props.username}!</h3>
                                <hr></hr>
                                <p>Now that you have created the group, you can share your group name and code or the link below to those that you would like to join the group!</p>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                    <MDBAnimation type="fadeIn" duration="1s" delay="0.5s">
                        <MDBRow style={{ marginTop: '5%' }}>
                            <MDBCol md="12">
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>Release Date</th>
                                            <th>Max Amount to Spend</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <tr>
                                            <td>{this.props.groupreleasedate}</td>
                                            <td>${this.props.groupmaxamount}</td>
                                        </tr>
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                    <MDBAnimation type="fadeIn" duration="1s" delay="1s">
                        <MDBRow>
                            <MDBCol>
                                <h4 style={{ marginTop: '2.5%' }}>Your Group Share Link: </h4>
                                <MDBInput type="text" label="Send this to the people you want to join! - " rows="1" value={this.state.groupShareLink} />
                                <CopyToClipboard text={this.state.groupShareLink} onCopy={() => this.setState({ copyText: 'Copied!' })}>
                                    <MDBBtn disabled={this.state.disableBtn}>{this.state.copyText}</MDBBtn>
                                </CopyToClipboard>
                                <h4 style={{ marginTop: '2.5%' }}>Your Group Code: </h4>
                                <MDBInput type="text" label="Share this with the people you want to join! - " rows="1" value={this.props.grouppass} />
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                </MDBContainer>
            </div>
        );
    }
}

export default GettingStartedSuccess;
