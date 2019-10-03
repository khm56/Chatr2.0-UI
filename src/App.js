import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import SideNav from "./components/Navigation/SideNav";

import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelForm from "./components/ChannelForm";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="row siteBg">
          {this.props.user ? (
            <>
              <div className="col-3">
                <SideNav />
              </div>
              <div className=" col-9 " id="content">
                <Switch>
                  <Route path="/welcome" component={Welcome} />
                  <Route path="/(login|signup)" component={RegistrationForm} />
                  <Route path="/channels/create" component={ChannelForm} />
                  <Route
                    path="/channels/:channelID?"
                    component={SuperSecretPage}
                  />

                  <Redirect to="/welcome" />
                </Switch>
                <Footer className="fixed-bottom" />
              </div>
            </>
          ) : (
            <div className="container">
              <Switch>
                <Route path="/welcome" component={Welcome} />
                <Route path="/(login|signup)" component={RegistrationForm} />
                <Route path="/channels/create" component={ChannelForm} />
                <Route
                  path="/channels/:channelID?"
                  component={SuperSecretPage}
                />

                <Redirect to="/welcome" />
              </Switch>
              <Footer className="fixed-bottom" />
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
