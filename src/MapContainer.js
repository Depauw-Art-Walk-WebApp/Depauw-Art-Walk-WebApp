import React, { Component } from 'react';
import * as artData from './data/art_data.json';
import ArtInfoModal from './components/modals/ArtInfoModal';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import config from './config.json';

const DEPAUW_BOUNDS = {
  north: 39.653244,
  south: 39.621949,
  west: -86.902833,
  east: -86.831743,
};

const DEPAUW_CENTER = { lat: 39.63930503475011, lng: -86.86344078645712 };

const mapStyle = { width: '100vw', height: '100vh' };

const option = {
  restriction: {
    latLngBounds: DEPAUW_BOUNDS,
    strictBounds: false,
  },
  // zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  // rotateControl: false,
  fullscreenControl: false,
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedArt: null,
      modalShow: false,
      options: null,
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

  render() {
    return (
      <div>
        <LoadScript googleMapsApiKey={config.GOOGLE_MAP_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={DEPAUW_CENTER}
            zoom={15}
            options={option}
          >
            {artData.features.map((artWork) => (
              <Marker
                key={artWork.properties.ART_ID}
                position={{
                  lat: artWork.geometry.coordinates[0],
                  lng: artWork.geometry.coordinates[1],
                }}
                onClick={() => {
                  this.setSelectedArt(artWork);
                  this.setModalShow(true);
                }}
                // icon={{
                //   url: ``,
                //   scaledSize: new window.google.maps.Size(25, 25),
                // }}
              />
            ))}
          </GoogleMap>
        </LoadScript>

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
