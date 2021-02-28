import { Modal } from 'react-bootstrap';
import React from 'react';

class ArtInfoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let modal = <div></div>;
    if (this.props.selectedArt !== null) {
      modal = (
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          backdrop='static'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.props.selectedArt.properties.NAME}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props.selectedArt.properties.DESCRIPTION}</p>
            <img src={this.props.selectedArt.properties.PICTURE} />
          </Modal.Body>
        </Modal>
      );
    }
    return modal;
  }
}

export default ArtInfoModal;
