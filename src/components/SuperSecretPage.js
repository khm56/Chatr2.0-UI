import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "./Navigation/Loading";
class SuperSecretPage extends Component {
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    if (!this.props.user) return <Redirect to="/login" />;
    return (
      <div
        style={{
          backgroundImage: `url(
          "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: " cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          minHeight: "600px"
        }}
      ></div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  loading: state.rootChannel.loading
});
export default connect(mapStateToProps)(SuperSecretPage);
