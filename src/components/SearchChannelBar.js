import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


import * as actionCreators from "../redux/actions";

class SearchChannelBar extends Component {
    state = { query: "" };

    handleChange = event => {
        this.setState({ query: event.target.value });
        this.props.onChange(event.target.value);
    };

    render() {
        return (
            <div className="form-group col-lg-6 col-12 mx-auto">
                <div className="input-group my-3">
                    <input
                        className="form-control"
                        type="text"
                        value={this.state.query}
                        onChange={this.handleChange}
                        placeholder="search for messages"
                    />
                    <div className="input-group-append">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchChannelBar;
