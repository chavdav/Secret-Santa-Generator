import React, { Component } from 'react';
import OtherPageNav from '../components/navigation/OtherPageNav';
import JoinAGroupForm from '../components/joinagroup/JoinAGroupForm';

class JoinAGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFullName: '',
            groupJoinedName: '',
            formOrsuccess: <JoinAGroupForm callback={this.callBackFromJoinGroup}/>
        }
        this.callBackFromJoinGroup = this.callBackFromJoinGroup.bind(this);
    }

    callBackFromJoinGroup = (dataFromChild) => {
        this.setState({
            formOrsuccess: dataFromChild
        });
    }

    render() {
        return (
            <div>
                <OtherPageNav />
                {this.state.formOrsuccess}
            </div>
        );
    }
}

export default JoinAGroup;