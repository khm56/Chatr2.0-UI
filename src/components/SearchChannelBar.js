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
            <div className="form-group col-lg-6 col-12 mx-auto rounded-pill border-2  "
                style={{ backgroundColor: 'rgba(255, 0, 200, 0.904)', position: "relative", left: "50px", top: "20px", border: "1px solid transparent", margin: "20px" }}>
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
