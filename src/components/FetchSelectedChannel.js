import React from "react";
// import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSelectedChannel } from "../redux/actions";
import AddMessages from "./AddMessages";
import Loading from "./Navigation/Loading";

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
      //Clear and setInterval should happen in this part of the condition when the ID Changes
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
      if (findImage.image_url) {
        return findImage.image_url;
      }
    }
    return "http://www.rangerwoodperiyar.com/images/joomlart/demo/default.jpg";
  }
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
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
          backgroundRepeat: "no-repeat",
          backgroundSize: " cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          minHeight: "400px"
        }}
      >
        {this.props.messages.map(channel => {
          return (
            <div className="row">
              <div className="col-8">
                <div className="border-transparent bg-transparent ">
                  <ul className="list-group bg-transparent">
                    <br></br>
                    <br></br>
                    {/* <li className=“list-group-item”>{channel.timestamp}</li> */}
                    {/* <li className=“speech-bubble sizing text-left  text-white d-inline  my-2  “>{channel.timestamp}</li> */}
                    <li className="speech-bubble sizing text-left  text-white d-inline  my-2  ">
                      {""}
                      <div className="row mx-auto">
                        {channel.username}: {channel.message}
                      </div>
                      <div className="row">
                        <div className="col-3"></div>
                        <small className="col-9 text-right">
                          {channel.timestamp}
                        </small>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
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
    messages: state.rootMessages.messages,
    loading: state.rootChannel.loading
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
