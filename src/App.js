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

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        {/* <Test /> */}
        <NavBar />

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
    );
  }
}

export default App;
