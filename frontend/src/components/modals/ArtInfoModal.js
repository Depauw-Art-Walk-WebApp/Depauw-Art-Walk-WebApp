import { Modal, Container, Row, Col } from 'react-bootstrap';
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
            // backdrop='static'
            keyboard={false}
            dialogClassName='modal-90w'
            scrollable={true}
            size='lg'
          >
            <Modal.Header closeButton>
              <Modal.Title
                style={{
                  width: '100%',
                }}
              >
                <Container>
                  <Row>
                    <Col
                      style={{
                        fontStyle: 'italic',
                      }}
                    >
                      {this.props.selectedArt.properties.TITLE}
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        width: '100%',
                        textAlign: 'right',
                        // justifyContent: 'right',
                      }}
                    >
                      - {this.props.selectedArt.properties.AUTHOR}
                    </Col>
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
