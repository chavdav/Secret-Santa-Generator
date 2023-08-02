import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './pages/LandingPage';
import JoinAGroup from './pages/JoinAGroup';
import * as serviceWorker from './serviceWorker';
import Footer from './components/navigation/Footer';
import { Route, HashRouter as Router, Switch} from 'react-router-dom';
import ViewYourGroup from './pages/ViewYourGroup';
import JoinAGroupShareMain from './components/joinagroup/JoinAGroupShareMain';

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/joinagroup" component={JoinAGroup} />
                    <Route exact path="/joinagroup/share/:groupname/:grouppass" component={JoinAGroupShareMain} />
                    <Route exact path="/viewyourgroup" component={ViewYourGroup} />
                    <Route exact path="/viewyourgroup/:groupname/:grouppass" component={ViewYourGroup} />
                </Switch>
                <Footer />
            </Router>

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
