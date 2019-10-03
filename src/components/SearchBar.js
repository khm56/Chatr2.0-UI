import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { filterChannels } from "../redux/actions";

class SearchBar extends Component {
  render() {
    return (
      <div className="input-group ">
        <input
          className="form-control "
          type="text"
          placeholder="Seach for channels..."
          onChange={event => this.props.filterChannels(event.target.value)}
        />
        <div className="input-group-append">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    filterChannels: query => dispatch(filterChannels(query))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
