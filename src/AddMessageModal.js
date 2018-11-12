import React, { Component } from "react";

import MessageForm from "./MessageForm";
import Modal from "react-responsive-modal";

class AddMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }
  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }
  render() {
    const { open } = this.state;
    return (
      <div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <MessageForm channel={this.props.channel} />
        </Modal>
        <input
          type="button"
          onClick={this.onOpenModal}
          value="Add New Message!"
        />
      </div>
    );
  }
}
export default AddMessageModal;
