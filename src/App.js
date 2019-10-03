import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Scripts
import main from "./assets/js/main";

// Components

import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channel from "./components/Channel";
import { CheckMessagesTS } from "./redux/actions";
class App extends Component {
  componentDidMount() {
    this.interval = window.setInterval(() => this.CheckMSG(), 1000);
    main();
  }
  CheckMSG() {
    this.props.visited.forEach(channelID => {
      let oldChannel = this.props.channels.find(chn => chn.id == channelID);
      if (oldChannel.messages) {
        let OldCount = oldChannel.messages.length;

        this.props.CheckMessagesTS(oldChannel.id, OldCount);
      }
    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "75px" }}>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/private" component={SuperSecretPage} />
          <Route path="/channel/:channelID?" component={Channel} />
          <Redirect to="/login" />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  CheckMessagesTS: (id, length) => dispatch(CheckMessagesTS(id, length))
});
const mapStateToProps = state => ({
  channels: state.channelsReducer.channels,
  user: state.user,
  newMessage: state.channelsReducer.newMessage,
  visited: state.channelsReducer.visited
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
