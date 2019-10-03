import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Scripts
import main from "./assets/js/main";

// CSS
// import maincss from "./assets/css/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
//import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import ChannelForm from "./ChannelForm";
import ChannelPage from "./ChannelPage";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          {/* <Route path="/(login|signup)" component={RegistrationForm} /> */}
          <Route path="/signup" component={SignupForm} />
          <Route path="/login" component={LoginForm} />

          {!!this.props.user && (
            <Route path="/createChannel" component={ChannelForm} />
          )}
          {!!this.props.user && (
            <Route path="/private" component={SuperSecretPage} />
          )}
          {!!this.props.user && (
            <Route path="/msgs/:channelID" component={ChannelPage} />
          )}

          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
