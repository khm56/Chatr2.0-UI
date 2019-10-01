import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchChannelDetail } from "../redux/actions";
import Messages from "./Messages";
import SearchChannelBar from "./SearchChannelBar"
class SendMessageForm extends Component {
  //   state = {
  //     channel:"",
  //     changed:false
  // }

  state = {
    filteredMessages: [],
    searchIsUsed: false,
  };

  filterMessages = query => {
    const channel = this.props.channel;
    query = query.toLowerCase();

    let filteredMessages = channel.filter(messageItem =>
      `${messageItem.message}`.toLowerCase().includes(query)
    );
    this.setState({
      filteredMessages: filteredMessages,
      searchIsUsed: true
    });
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined)
        this.props.fetchChannelDetail(this.props.match.params.channelID);
    }, 5000);
  }



  componentDidUpdate(prevProps) {
    if (this.props.match.params.channelID !== undefined) {
      if (
        this.props.match.params.channelID !== prevProps.match.params.channelID
      ) {
        this.props.fetchChannelDetail(this.props.match.params.channelID);
      } else {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
          this.props.fetchChannelDetail(this.props.match.params.channelID);
        }, 5000);
      }
    }
  }

  myView = () => {
    const channel = this.props.channel;

    if (!!channel) {
      if (this.state.searchIsUsed) {
        const resultedMessages = this.state.filteredMessages.map(message => (
          <Messages key={message.id} messages={message} />));
        return <div>{resultedMessages}</div>
      }
      else //search is not used
      {
        const messages = channel.map(message => (
          <Messages key={message.id} messages={message} />));
        return <div>{messages}</div>
      }
      ;
    }
  }


  render() {
    if (!this.props.user) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <SearchChannelBar onChange={this.filterMessages} />
        <div className="content col-10">{this.myView()}</div>
      </>

    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channel: state.channel.channel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannelDetail: channelID => dispatch(fetchChannelDetail(channelID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageForm);
