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
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {this.props.selectedArt.properties.NAME}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    <Image
                      src={this.props.selectedArt.properties.PICTURE}
                      fluid
                    />
                  </Col>
                </Row>
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
