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
const TEMP_CENTER = { lat: 37.653052, lng: 126.776982 };

const mapStyle = { width: '100vw', height: '100vh' };

const option = {
  restriction: {
    latLngBounds: DEPAUW_BOUNDS,
    strictBounds: false,
  },

  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,

  fullscreenControl: false,
  clickableIcons: false,
};

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedArt: null,
      modalShow: false,
      options: null,
      userPosition: {
        latitude: null,
        longitude: null,
      },
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          userPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
      });
    }
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
            zoom={16}
            options={option}
          >
            <Marker
              key={'userMarker'}
              position={{
                lat: this.state.userPosition.latitude,
                lng: this.state.userPosition.longitude,
              }}
              icon={{
                url: '/image/user.png',
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />

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
                icon={{
                  url: '/image/marker.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
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
