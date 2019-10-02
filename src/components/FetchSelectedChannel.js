import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSelectedChannel } from "../redux/actions";
import AddMessages from "./AddMessages";
class FetchSelectedChannel extends React.Component {
  state = { collapsed: false };

  componentDidMount() {
    this.interval = setInterval(
      () => this.props.fetchSelectedChannel(this.props.match.params.channelID),
      500
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.channelID != prevProps.match.params.channelID)
      this.props.fetchSelectedChannel(this.props.match.params.channelID);
    else {
      clearInterval(this.interval);
      this.interval = setInterval(
        () =>
          this.props.fetchSelectedChannel(this.props.match.params.channelID),
        500
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  FetchImage() {
    const findImage = this.props.channels.find(channel => {
      if (channel.id == this.props.match.params.channelID) {
        return channel;
      }
    });

    if (findImage) {
      return findImage.image_url;
    }
    return "http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg";
  }
  render() {
    let image_url = this.FetchImage();
    // console.log(this.props.messages);
    console.log(image_url);
    // console.log(this.props.channels);
    // console.log(this.props.user);

    // if (!this.props.user) return <Redirect to="/welcome" />;

    return (
      <div
        style={{
          backgroundImage: `url(${image_url})`,
          backgroundPosition: "center"
          //   backgroundSize: "contain",
          //   backgroundRepeat: "no-repeat"
        }}
      >
        {this.props.messages.map(channel => {
          return (
            <div className="card bg-transparent">
              <ul className="list-group bg-transparent">
                <br></br>
                <br></br>
                {/* <li className="list-group-item">{channel.timestamp}</li> */}
                <li className="list-group-item">{channel.timestamp}</li>
                <li className="list-group-item">
                  {" "}
                  {channel.username}: {channel.message}
                </li>
              </ul>
            </div>
          );
        })}
        <AddMessages channelID={this.props.match.params.channelID} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.rootChannel.channels,
    messages: state.rootMessages.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedChannel: channelID => dispatch(fetchSelectedChannel(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchSelectedChannel);
