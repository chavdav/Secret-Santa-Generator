import React, { Component } from 'react';
import JoinAGroupShare from './JoinAGroupShare';
import OtherPageNav from '../navigation/OtherPageNav';
import LinkBrokenErrorPage from '../errors/LinkBrokenErrorPage';


class JoinAGroupShareMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFullName: '',
            groupJoinedName: '',
            formOrsuccess: '',
            groupName: '',
            groupPass: ''
        }
        this.callBackFromJoinGroupShareMain = this.callBackFromJoinGroupShareMain.bind(this);
    }

    callBackFromJoinGroupShareMain = (dataFromChild) => {
        this.setState({
            formOrsuccess: dataFromChild
        });
    }

    async componentDidMount() {
        const { groupname } = this.props.match.params;
        const { grouppass } = this.props.match.params;

        console.log("Parameters: " + groupname);
        console.log("Parameters: " + grouppass);

        const checkGroup = await fetch(`/api/groups/retrieve?groupName=${encodeURIComponent(groupname)}&groupPass=${encodeURIComponent(grouppass)}`);
        const jsonGroup = await checkGroup.json();
        console.log(jsonGroup);
        if (jsonGroup.status === 403 || jsonGroup.status === 404) {
            console.log("setting state as broken");
            this.setState({formOrsuccess: <LinkBrokenErrorPage />});
        } else {
            console.log("setting state as share");
            this.setState({
                formOrsuccess: <JoinAGroupShare callback={this.callBackFromJoinGroupShareMain} groupName={groupname} groupPass={grouppass} releaseDate={jsonGroup.releaseDate} maxAmount={jsonGroup.maxAmount}/>
            });
        }

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

export default JoinAGroupShareMain;