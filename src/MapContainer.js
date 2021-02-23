import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import * as artData from './data/art_data.json';
import ArtInfoModal from './components/modals/ArtInfoModal';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap';

const DEPAUW_BOUNDS = {
  north: -86.87295,
  south: -86.858128,
  west: 39.634781,
  east: 39.642672,
};

const DEPAUW_CENTER = { lat: 39.63930503475011, lng: -86.86344078645712 };

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCiMzJYVMo4vpVBNUQ6v7nwBhtBD5uhQyM&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={DEPAUW_CENTER}
    defaultOptions={{
      restrictions: {
        latLngBounds: DEPAUW_BOUNDS,
        strictBounds: true,
      },
      // styles: mapStyles,
    }}
  >
    {artData.features.map((artWork) => (
      <Marker
        key={artWork.properties.ART_ID}
        position={{
          lat: artWork.geometry.coordinates[0],
          lng: artWork.geometry.coordinates[1],
        }}
        onClick={() => {
          props.setSelectedArt(artWork);
          props.setModalShow(true);
        }}
        // icon={{
        //   url: ``,
        //   scaledSize: new window.google.maps.Size(25, 25),
        // }}
      />
    ))}

    {/* {props.selectedArt != null && (
      <InfoWindow
        onCloseClick={() => {
          props.setSelectedArt(null);
          props.setModalShow(false);
        }}
        position={{
          lat: props.selectedArt.geometry.coordinates[0],
          lng: props.selectedArt.geometry.coordinates[1],
        }}
      >
        <div>
          <h2>{props.selectedArt.properties.NAME}</h2>
          <p>{props.selectedArt.properties.DESCRIPTION}</p>
          <img src={props.selectedArt.properties.PICTURE} />
        </div>
      </InfoWindow>
    )} */}
  </GoogleMap>
));

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedArt: null,
      modalShow: false,
    };
  }

  setSelectedArt = (art) => {
    this.setState({
      selectedArt: art,
    });
  };

  setModalShow = (show) => {
    this.setState({
      modalShow: show,
    });
  };
  // style={{ width: '100vw', height: '100vh' }}
  render() {
    return (
      <div>
        <MyMapComponent
          selectedArt={this.state.selectedArt}
          setSelectedArt={this.setSelectedArt}
          setModalShow={this.setModalShow}
        />

        <ArtInfoModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          selectedArt={this.state.selectedArt}
        />
      </div>
    );
  }
}

export default MapContainer;
