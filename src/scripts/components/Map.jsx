import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: "",
            showingInfoWindow: false,
            activeMarker: {},
        }
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.fetchPlaces = this.fetchPlaces.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props.name,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onMapClicked(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    }

    fetchPlaces(props, map) {
        // Try HTML5 geolocation.
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let service = new google.maps.places.PlacesService(map);
                    let geocoder = new google.maps.Geocoder;
                    geocoder.geocode({'location': this.props.pos}, (results, status) => {
                        if (status === google.maps.GeocoderStatus.OK) {
                            if (results[1]) {
                                service.getDetails({
                                    placeId: results[1].place_id
                                }, (place, status) => {
                                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                                        this.setState({selectedPlace: `${place.name}, ${place.formatted_address}`});
                                    }
                                });
                            } else {
                                window.alert('No results found');
                            }
                        } else {
                            window.alert('Geocoder failed due to: ' + status);
                        }
                    });
                })
            }  
        } catch(e) {
            return;
        }
    }

    render() {
        return (
            <Map
                google={this.props.google}
                style={style}
                onReady={this.fetchPlaces}
                initialCenter={this.props.pos}
                center={this.props.pos}
                zoom={15}
                onClick={this.onMapClicked}
            >
                {this.props.users.map((item) =>
                    <Marker onClick={this.onMarkerClick}
                        key={item.email}
                        name={this.state.selectedPlace}
                        position={item.pos}
                    />
                )}
                {this.props.users.map((item) =>
                    <InfoWindow onClose={this.onInfoWindowClose}
                        key={item.email}
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{`${item.username} is here: ${this.state.selectedPlace} `}</h1>
                        </div>
                    </InfoWindow>
                )}
            </Map>
        );
    }
}

const style = {
    width: '100%',
    height: '350px'
};

export default GoogleApiWrapper({
    apiKey: ("AIzaSyB3RUR2K1G3WZUpCI4DYNEF1PypKwXa_H0")
})(MapGoogle)