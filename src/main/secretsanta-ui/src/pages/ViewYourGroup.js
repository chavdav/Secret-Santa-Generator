import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBInput, MDBTable, MDBTableBody, MDBTableHead, MDBContainer, MDBBtn, MDBAnimation, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import OtherPageNav from '../components/navigation/OtherPageNav';
import LoadingSpinner from '../components/utilities/LoadingSpinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ViewYourGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            groupPass: '',
            groupUsers: '',
            groupReleaseDate: '',
            groupMaxAmount: '',
            groupUserTable: '',
            groupShareLink: '',
            modal: false,
            modalMessage: '',
            loading: '',
            disableBtn: true,
            copyText: 'Copy',
            copyToClipboard: ''
        }
        this.retrieveGroup = this.retrieveGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    async componentDidMount() {
        const { groupname } = this.props.match.params;
        const { grouppass } = this.props.match.params;

        if(groupname !== undefined && grouppass !==  undefined) {
          this.retrieveGroupWithParams(groupname, grouppass);
        }
    }

    async retrieveGroup() {
        this.retrieveGroupWithParams(this.state.groupName, this.state.groupPass);
    }

    async retrieveGroupWithParams(groupName, groupPass) {
        this.setState({
            loading: <LoadingSpinner />
        })
        const responseGroup = await fetch(`/api/groups/retrieve?groupName=${encodeURIComponent(groupName)}&groupPass=${encodeURIComponent(groupPass)}`);
        const jsonGroup = await responseGroup.json();
        if (jsonGroup.status === 404) {
            this.setState({
                modalMessage: 'The group was not found! Please check the group name and try again.',
                loading: ''
            });
            this.toggle();
        }
        if (jsonGroup.status === 403) {
            this.setState({
                modalMessage: 'The group code was incorrect! Please enter the correct group code to view the group.',
                loading: ''
            });
            this.toggle();
        } else {
            this.setState({
                groupName: jsonGroup.groupName,
                groupUsers: jsonGroup.users,
                groupReleaseDate: jsonGroup.releaseDate,
                groupMaxAmount: jsonGroup.maxAmount
            });

            var usertable = [];

            if (this.state.groupUsers.length === 0) {
                usertable = [];
                this.setState({
                    groupUserTable: usertable,
                    loading: ''
                })
            } else {
                for (var i = 0; i < this.state.groupUsers.length; i++) {
                    usertable.push(<tr><td>{i + 1}</td><td>{this.state.groupUsers[i].firstName} {this.state.groupUsers[i].lastName}</td><td>{this.state.groupUsers[i].wishlist}</td></tr>);
                }
                this.setState({
                    groupUserTable: usertable,
                    loading: ''
                });
            }

            const groupNameForShare = this.state.groupName;
            const groupPassForShare = this.state.groupPass;

            this.setState({
                disableBtn: false,
                groupShareLink: "Join my Secret Santa Group! - http://secret-santa-321.herokuapp.com/#/joinagroup/share/" + groupNameForShare + "/" + groupPassForShare,
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var field = document.getElementsByName(name);

        if(name !== "userWishList") {
            field[0].addEventListener('keypress', function (event) {
                var key = event.keyCode;
                if (key === 32) {
                    event.preventDefault();
                }
            });
        }

        this.setState({
            [name]: value
        });
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <OtherPageNav />
                <MDBContainer style={{ marginTop: '5%' }}>
                    <MDBAnimation type="fadeIn" duration="1s">
                        <MDBRow>
                            <MDBCol md="12">
                                <h3 style={{ textAlign: 'center' }}>View The Members of Your Group!</h3>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                    <MDBAnimation type="fadeIn" duration="1s" delay="0.5s">
                        <MDBRow style={{ marginTop: '4%' }}>
                            <MDBCol md="4">
                                <h4>Enter Your Group Name and Code</h4>
                                <hr></hr>
                                <p>After clicking View Group, a table of the members that have joined your group will load down below.
                                 You will also see the date of recipient release and the cap on amount of money to spend on gifts.</p>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBRow>
                                    <MDBCol>
                                        <MDBInput
                                            label="Your Group Name*"
                                            icon="user"
                                            group
                                            type="text"
                                            validate
                                            error="wrong"
                                            success="right"
                                            name="groupName"
                                            required
                                            onChange={this.handleChange}
                                        />
                                        <MDBInput
                                            label="Your Group Code*"
                                            icon="lock"
                                            group
                                            type="password"
                                            validate
                                            error="wrong"
                                            success="right"
                                            name="groupPass"
                                            required
                                            onChange={this.handleChange}
                                        />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol className="d-flex justify-content-center">
                                        <MDBBtn rounded color="success" onClick={this.retrieveGroup}>View Group</MDBBtn>
                                        {this.state.loading}
                                    </MDBCol>
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                    <MDBAnimation type="fadeIn" duration="1s" delay="1s">
                        <MDBRow style={{ marginTop: '2%', marginBottom: '20%' }}>
                            <MDBCol md="12">
                                <h4>Group Name: {this.state.groupName}</h4>
                                <h4>Recipient Release Date: {this.state.groupReleaseDate}</h4>
                                <h4>Max Amount to Spend: ${this.state.groupMaxAmount}</h4>
                                <h4>Your Group Share Link: </h4>
                                <MDBInput type="text" label="Send this to the people you want to join! - " rows="1" value={this.state.groupShareLink} />
                                <CopyToClipboard text={this.state.groupShareLink} onCopy={() => this.setState({ copyText: 'Copied!' })}>
                                    <MDBBtn disabled={this.state.disableBtn}>{this.state.copyText}</MDBBtn>
                                </CopyToClipboard>
                            </MDBCol>
                            <MDBCol md="12">
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Wishlist</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {this.state.groupUserTable}
                                    </MDBTableBody>
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                </MDBContainer>

                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalHeader toggle={this.toggle}><span style={{ color: 'black' }}>Oops!</span></MDBModalHeader>
                    <MDBModalBody>
                        <span style={{ color: 'black' }}>{this.state.modalMessage}
                            <br></br>
                            <br></br>
                            Happy Holidays!
                            </span>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

            </div >
        );
    }
}

export default ViewYourGroup;
