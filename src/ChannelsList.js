import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import AddChannelCard from "./AddChannelCard";
import ChannelCard from "./ChannelCard";
// import SearchBar from "./SearchBar";
import Loading from "./Loading";

class ChannelsList extends Component {
  render() {
    const { loading, Channels } = this.props;

    const channelCards = Channels.map(channel => (
      <ChannelCard key={channel.name} channel={channel} />
    ));

    if (loading) {
      return <Loading />;
    } else {
      return (
        <div className="channels">
          <h3>Channels</h3>
          <div className="row">
            <AddChannelCard />
            {channelCards}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootAuth.user,
    loading: state.rootChans.loading,
    Channels: state.rootChans.channels
  };
};

export default connect(mapStateToProps)(ChannelsList);
