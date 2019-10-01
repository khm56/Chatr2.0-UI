import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../redux/actions";


class MessagesList extends Component {
    state = { 
        message: "",
        };

        componentDidMount() {
            setTimeout(function() { //Start the timer
                 this.props.fetchLatestMessages(this.props.match.params.ChannelID);
               
            }.bind(this), 1)
            }


componentDidUpdate() {
setTimeout(function() { //Start the timer
     this.props.fetchLatestMessages(this.props.match.params.ChannelID,"2019-09-30T20:17:46.384Z");
}.bind(this), 5000)
}



    render(){
        const addMessageForm = () => {
          return(   
            <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Type Message Here"
                    name="message"
                    onChange={changeHandler}
                  />
                  <button onClick={submitHandler}>Send</button>
              </div>
          )        
        }
        

        const changeHandler = e => {
            this.setState({ [e.target.name]: e.target.value });
          };
          var today = new Date();
          console.log(today.getFullYear())


          const submitHandler = (e) => {
            e.preventDefault();
            this.props.postMessage(this.state.message,this.props.match.params.ChannelID);
            this.setState({ [e.target.name]: e.target.value });
          };


        let messages = this.props.messages.map((x, i) =>{
        return (
        [x, this.props.users[i],
        `${this.props.time[i].substr(8,2)}-${this.props.time[i].substr(5,2)}-${this.props.time[i].substr(0,4)}
         - ${this.props.time[i].substr(11,5)}`]
        );
        })
        let messagesPrettier = messages.map (message => {
            return(
                <>
                {message[0]}
                <br/>
                ----------------------------
                <br/>
                {message[1]}
                <br/>
                ----------------------------
                <br/>
                {message[2]}
                <br/>
                ----------------------------
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                </>

  
            )
        })
    
    return(
        <>
        <h1 className="my-2 mx-5"> Messages </h1>
        <button onClick={() => this.props.fetchMessages(this.props.match.params.ChannelID)}>View all</button>
            <div className="mx-5">
                <p>{messagesPrettier}</p>
                {addMessageForm()}
            </div>
        
        </>
    )
    }
    
}

const mapStateToProps = state => {
    return {
     messages: state.channel.messages,
     users: state.channel.users,
     time: state.channel.time,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: ChannelID => dispatch(actionCreators.fetchMessages(ChannelID)),
        fetchLatestMessages: (ChannelID,timestamp) => dispatch(actionCreators.fetchLatestMessages(ChannelID,timestamp)),
        postMessage: (message,ChannelID) => dispatch(actionCreators.postMessage(message,ChannelID)),
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MessagesList);