import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Test from "./components/Navigation/test";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import MessagesList from "./components/MessagesList";
import { connect } from "react-redux";

// If interested ask me for a better solution to this project, your data structure made it more confusing for you
class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    console.log(this.props.user);
    return (
      <>
        {this.props.user ? null : <NavBar />}
        <div className="content-wrappers row mx-5">
          <div className="col-3 my-2 mx-5">
            {this.props.user ? (
              <Test />
            ) : (
              <img
                style={{ width: 450, heigth: 1500 }}
                src="https://media2.giphy.com/media/cJ6chuyHPYs8tDpJSI/source.gif"
              />
            )}
          </div>
          <div className="col-8 my-2">
            <Switch>
              <Route path="/welcome" component={Welcome} />
              <Route path="/(login|signup)" component={RegistrationForm} />
              <Route path="/private" component={SuperSecretPage} />
              <Route path="/channels/:ChannelID" component={MessagesList} />
              <Route path="/supersecretpage" component={SuperSecretPage} />
              <Route path="/CreateChannel/" component={MessagesList} />
              <Redirect to="/welcome" />
            </Switch>
            {/* <Footer /> */}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
