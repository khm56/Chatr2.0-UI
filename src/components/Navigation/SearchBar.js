import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import * as actionCreators from "../../redux/actions/";

class SearchBar extends Component {
    render() {
        return (
            <div className="form-group rounded-pill border-2  " style={{ backgroundColor: 'rgba(255, 0, 200, 0.904)', border: "1px solid transparent" }}>
                <div className="input-group my-2">
                    <input
                        className="form-control ml-2 mr-2 rounded-pill"

                        type="text"
                        placeholder=" 🔎 Find Channel..."

                        onChange={event => this.props.filterChannels(event.target.value)}
                    />

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterChannels: query => dispatch(actionCreators.filterChannels(query))
    };
};
export default connect(null, mapDispatchToProps)(SearchBar);
