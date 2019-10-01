import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import * as actionCreators from "./redux/actions";

// Scripts
import main from "./assets/js/main";
import { connect } from "react-redux";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import LoginForm from "./components/LoginForm";
import ChannelForm from "./components/ChannelForm";
import SendMessageForm from "./components/MessageForm";

class App extends Component {
  // state = {
  //   channel: this.props.match.params.channelID,
  //   changed: false
  // }

  componentDidMount() {
    main();
    this.props.fetchChannels();
    // this.props.fetchChannelDetail(this.props.match.params.channelID);

  }
  // componentDidUpdate(prevProps) {
  //   const channelID = this.props.match.params.channelID;
  //   if (prevProps.match.params.channelID !== channelID) {
  //     this.props.fetchChannelDetail(channelID);
  //   }

  // }



  // componentDidUpdate(prevState) {
  //   if (this.state.channel !== prevState.channel) {
  //     this.setState({ changed: true, channel: this.state.channel })

  //   }
  // }


  render() {
    return (
      <div >
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={RegistrationForm} />
          <Route path="/createChannel" component={ChannelForm} />
          <Route path="/private" component={SuperSecretPage} />
          <Route path="/channels/:channelID" component={SendMessageForm} />

          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(actionCreators.fetchChannels()),
    // fetchChannelDetail: channelID => dispatch(actionCreators.fetchChannelDetail(channelID))

  };
};
export default withRouter(connect(null, mapDispatchToProps)(App));
