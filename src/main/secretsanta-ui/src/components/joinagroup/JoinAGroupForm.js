import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBAnimation, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import JoinAGroupSuccess from './JoinAGroupSuccess';
import LoadingSpinner from '../utilities/LoadingSpinner';

class JoinAGroupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            groupPass: '',
            firstName: '',
            lastName: '',
            userEmail: '',
            userWishList: '',
            modal: false,
            modalMessage: '',
            loading: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
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

    async handleSubmit(event) {
        event.preventDefault();
        // alert("Something is being submitted");
        const firstName = this.state.firstName;
        const lastName = this.state.lastName;
        const email = this.state.userEmail;
        const wishlist = this.state.userWishList;
        this.setState({
            loading: <LoadingSpinner />
        })
        //const responseCreateUser = await fetch(`/api/users/create?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&wishlist=${encodeURIComponent(wishlist)}`);
        const responseAddUserToGroup = await fetch(
            `/api/groups/addUserToGroup?groupName=${encodeURIComponent(this.state.groupName)}&groupPass=${encodeURIComponent(this.state.groupPass)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&wishlist=${encodeURIComponent(wishlist)}`);
        const jsonAddUserToGroup = await responseAddUserToGroup.json();
        if (jsonAddUserToGroup.status === 404) {
            this.setState({
                modalMessage: 'Group not found! Please check the group name and try again!'
            });
            this.toggle();
            this.setState({
                loading: ''
            });
        }
        else if (jsonAddUserToGroup.status === 401) {
            this.setState({
                modalMessage: 'Group code is incorrect. Please try again!'
            });
            this.toggle();
            this.setState({
                loading: ''
            });
        } else {
            this.props.callback(<JoinAGroupSuccess username={this.state.firstName} groupname={jsonAddUserToGroup.groupName} grouppass={jsonAddUserToGroup.groupPass} groupmaxamount={jsonAddUserToGroup.maxAmount} groupreleasedate={jsonAddUserToGroup.releaseDate} />);
            this.setState({
                loading: ''
            });
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <MDBContainer style={{ marginTop: '5%' }}>
                    <MDBAnimation type="fadeIn" duration="1s">
                        <MDBRow>
                            <MDBCol md="12">
                                <h3 style={{ textAlign: 'center' }}>Join A Group</h3>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12" style={{marginTop: '5%'}}>
                                <p>If you are at this page that means that you have been invited to join a Secret Santa Group. Once you join you will be put into the pool of
                                    people that will be emailed a Secret Santa Recipient! Once you recieve your recipient you will also recieve their wishlist in your email as well. From there, your group can decide
                                    a time to actually distribute the gifts. The specifics of this group are listed down below. You will need to ask the creator of the group for the code if you wish to
                                    see the others that have joined your group.
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBAnimation>
                    <form onSubmit={this.handleSubmit}>
                        <MDBAnimation type="fadeIn" duration="1s" delay="0.5s">
                            <MDBRow style={{ marginTop: '2%' }}>
                                <MDBCol md="4">
                                    <h4>Enter The Group Name and Code</h4>
                                    <hr></hr>
                                    <p>Enter the Group Name and Code of the group you would like to join.</p>
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
                        </MDBAnimation>
                        <MDBAnimation type="fadeIn" duration="1s" delay="1s">

                            <MDBRow>
                                <MDBCol md="4">
                                    <h4>Enter Your Info</h4>
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
                            <MDBRow style={{ marginBottom: '20%' }}>
                                <MDBCol className="d-flex justify-content-center">
                                    <MDBBtn rounded color="success" type="submit">Join Group </MDBBtn>
                                    {this.state.loading}
                                </MDBCol>
                            </MDBRow>
                        </MDBAnimation>
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

export default JoinAGroupForm;
