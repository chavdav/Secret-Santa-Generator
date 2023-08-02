import React, { Component } from 'react';
import HeroSection from '../components/landing/HeroSection';
import GettingStarted from '../components/landing/GettingStarted';


class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formOrsuccess: <GettingStarted callback={this.callbackFromGettingStarted}/>
        }
        this.callbackFromGettingStarted = this.callbackFromGettingStarted.bind(this);
    }

    callbackFromGettingStarted= (dataFromChild) => {
        this.setState({
            formOrsuccess: dataFromChild
        });
    }

    render() {
        return (
            <div>
                <HeroSection />
                {this.state.formOrsuccess}
            </div>
        );
    }
}

export default LandingPage;