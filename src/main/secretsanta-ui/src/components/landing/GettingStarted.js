import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBInput, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { Link } from 'react-router-dom';
import GettingStartedSuccess from './GettingStartedSuccess';
import LoadingSpinner from '../utilities/LoadingSpinner';


class GettingStarted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            groupName: '',
            releaseDate: '',
            maxAmount: '',
            fisrtName: '',
            lastName: '',
            userEmail: '',
            userWishList: '',
            modalMessage: '',
            loading: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initializeGroupWithUser = this.initializeGroupWithUser.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.initializeGroupWithUser();
    }

    async initializeGroupWithUser() {
        var md5 = require('md5');
        var groupPassHash = md5(Date.now() + this.state.groupName).substring(0, 4);
        try {
            this.setState({
                loading: <LoadingSpinner />
            })
            const responseCreateGroup = await fetch(`/api/groups/create?groupName=${encodeURIComponent(this.state.groupName)}&groupPass=${encodeURIComponent(groupPassHash)}&releaseDate=${encodeURIComponent(this.state.releaseDate)}&maxAmount=${encodeURIComponent(this.state.maxAmount)}`);
            const jsonCreateGroup = await responseCreateGroup.json();
            if (jsonCreateGroup.status === 403) {
                this.setState({
                    modalMessage: 'This group name is already in use, please choose another group name!',
                    loading: ''
                });
                this.toggle();
            } else {
                //const responseCreateUser = await fetch(`/api/users/create?name=${encodeURIComponent(this.state.userName)}&email=${encodeURIComponent(this.state.userEmail)}&wishlist=${encodeURIComponent(this.state.userWishList)}`);
                //const jsonCreateUser = await responseCreateUser.json();
                // eslint-disable-next-line
                const responesAddUserToGroup = await fetch(`/api/groups/addUserToGroup?groupName=${encodeURIComponent(jsonCreateGroup.groupName)}&groupPass=${encodeURIComponent(groupPassHash)}&firstName=${encodeURIComponent(this.state.firstName)}&lastName=${encodeURIComponent(this.state.lastName)}&email=${encodeURIComponent(this.state.userEmail)}&wishlist=${encodeURIComponent(this.state.userWishList)}`);
                this.props.callback(<GettingStartedSuccess groupname={this.state.groupName} grouppass={groupPassHash} username={this.state.firstName} groupmaxamount={this.state.maxAmount} groupreleasedate={this.state.releaseDate} />);
                this.setState({
                    loading: ''
                });
            }
        } catch (error) {
            console.error('Error:', error);
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
                <MDBContainer>
                    <div style={{ textAlign: 'center' }} id="getstarted">
                        <h1 style={{ textAlign: 'center' }}>Getting Started</h1>
                        <span style={{ fontSize: '1em' }}>Trying to join a group? <Link to="/joinagroup">click here</Link></span>
                        <MDBIcon icon="gift" size="sm" style={{ margin: '0 1%' }}></MDBIcon>
                        <span style={{ fontSize: '1em' }}>Already joined a group? <Link to="/viewyourgroup">click here</Link></span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <MDBRow style={{ marginTop: '5%' }}>
                            <MDBCol md="4">
                                <h4>Step 1. Create Group Name</h4>
                                <hr></hr>
                                <p>First we will have you create a group name.</p>
                            </MDBCol>
                            <MDBCol md="8">
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
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ marginTop: '2%' }}>
                            <MDBCol md="4">
                                <h4>Step 2. Select your Recipient Release Date</h4>
                                <hr></hr>
                                <p>This is the date on which each member that has joined your group will receive their secret santa recipient via email or text.</p>
                            </MDBCol>
                            <MDBCol md="8" style={{ marginTop: '4%' }}>
                                <MDBInput
                                    label="Release Date*"
                                    icon="calendar"
                                    group
                                    type="date"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="releaseDate"
                                    required
                                    onChange={this.handleChange}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ marginTop: '2%' }}>
                            <MDBCol md="4">
                                <h4>Step 3. Set a Max Dollar Amount</h4>
                                <hr></hr>
                                <p>Here you can set a cap on the amount of money the members of the group should spend on their secret santa recipient's gift. They will be
                                    notified of this amount as they join the group. Please use a whole dollar amount.
                                </p>
                            </MDBCol>
                            <MDBCol md="8" style={{ marginTop: '4%' }}>
                                <MDBInput
                                    label="Max Cost*"
                                    icon="dollar-sign"
                                    group
                                    type="text"
                                    title="Whole dollar value"
                                    pattern="[0-9]*"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="maxAmount"
                                    required
                                    onChange={this.handleChange}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ marginTop: '2%' }}>
                            <MDBCol md="4">
                                <h4>Step 4. Enter Your Info</h4>
                                <hr></hr>
                                <p>Now we will have you input your info, so that we can add you to your own group! We encourage you to use your full name in case there are people in your
                                    group that have the same name. This will avoid confusion as much as possible.
                                </p>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBInput
                                    label="First Name*"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="firstName"
                                    required
                                    onChange={this.handleChange}
                                />
                                <MDBInput
                                    label="Last Name*"
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="lastName"
                                    required
                                    onChange={this.handleChange}
                                />
                                <MDBInput
                                    label="Your Email*"
                                    icon="envelope"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="userEmail"
                                    required
                                    onChange={this.handleChange}
                                />
                                <MDBInput
                                    label="Wish List"
                                    icon="list"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                    name="userWishList"
                                    required
                                    onChange={this.handleChange}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow style={{ marginTop: '4%' }}>
                            <MDBCol md="4">
                                <h4>Step 5. Create and Share Your Group</h4>
                                <hr></hr>
                                <p>Lastly, click "Create Group"! If you have filled out everything correctly, you will be forwarded to the success screen where we will give you a link you can share to your
                                    friends and family to join!
                                </p>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCol md="12" className="d-flex justify-content-center">
                                    <MDBBtn rounded color="success" style={{ marginTop: '5%' }} type="submit">Create Group!</MDBBtn>
                                    {this.state.loading}
                                </MDBCol>
                            </MDBCol>
                        </MDBRow>
                    </form>
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
            </div>
        );
    }
}

export default GettingStarted;
