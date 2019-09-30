import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import { connect } from "react-redux";
class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    // if (!this.props.user) return <Redirect to="/welcome" />;
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          {!this.props.user && <Route path="/welcome" component={Welcome} />}
          {!this.props.user && (
            <Route path="/(login|signup)" component={RegistrationForm} />
          )}
          {!!this.props.user && (
            <Route path="/private" component={SuperSecretPage} />
          )}
          {!this.props.user ? (
            <Redirect to="/welcome" />
          ) : (
            <Redirect to="./private" />
          )}
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(mapStateToProps)(App);
