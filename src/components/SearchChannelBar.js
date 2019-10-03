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
            <div className="form-group col-lg-6 col-12 mx-auto rounded-pill border-2  " style={{ backgroundColor: '#e30090', border: "1px solid transparent" }}>
                <div className="input-group my-3 ">
                    <input
                        className="form-control rounded-pill"
                        type="text"
                        value={this.state.query}
                        onChange={this.handleChange}
                        placeholder="🔎 Search Chat..."
                    />

                </div>
            </div >
        );
    }
}

export default SearchChannelBar;
