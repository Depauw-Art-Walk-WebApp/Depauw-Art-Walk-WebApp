import { Modal, Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';

class ArtInfoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let modal = <div></div>;
    if (this.props.selectedArt !== null) {
      modal = (
        <div>
          <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            backdrop='static'
            keyboard={false}
            dialogClassName='modal-90w'
            scrollable={true}
            size='lg'
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <Container>
                  <Row>
                    <Col>{this.props.selectedArt.properties.NAME}</Col>
                  </Row>
                  <Row>
                    <Col>{this.props.selectedArt.properties.AUTHOR}</Col>
                  </Row>
                </Container>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                      {this.props.selectedArt.properties.DESCRIPTION}
                    </p>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
    return modal;
  }
}

export default ArtInfoModal;
