import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polyline, Marker, InfoWindow } from 'google-maps-react';
import { red } from '@material-ui/core/colors';


const mapStyles = {
  width: '100%',
  height: '100%'
};

var iconColorfull = {
  path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
  fillColor: "#FF0000",
  fillOpacity: 1,
  scale: 0.03, //to reduce the size of icons
};


var iconPin = {
  path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
  fillColor: "#000000",
  fillOpacity: 1,
  scale: 0.02, //to reduce the size of icons
};

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openInfoWindowStreetName: '',
      position: null,
      center: {
        lat: 31.252861,
        lng: 34.790059
      }
      // DisplayedStreetsLines: [{ coordinates: [], link: '' }],
      // DisplayedStreetsPoints: [{ coordinates: [], link: '' }],
      // DisplayedStreetsNames: [],
    }
  }


  handleStreetClicked = (link) => {
    window.open(link);
  }

  handleMouseover = (streetName, position) => {
    this.setState({
      openInfoWindowStreetName: streetName,
      openInfoWindowPosition: position
    });
  }

  handleMouseout = () => {
    this.setState({
      openInfoWindowStreetName: ''
    });
  }
  ChangePolylineStreertColor = (ref, color, weight) => {
    ref.polyline.setOptions({ strokeColor: color, strokeWeight: weight });
  }

  ChangeMarkerStreertColor = (ref, icon) => {
    ref.marker.setOptions({ icon: icon });
  }

  HandleColroChange = (streetName, isBackToBlack) => {
    try {
      var index = this.polylineRefArr.findIndex(ref => ref.props.name === streetName);
      if (index > -1) { //handle polyline
        var ref = this.polylineRefArr[index];
        var color;
        var weight;
        if (isBackToBlack) {
          color = "#000000";
          weight = 3;
        }
        else { //color
          color = "#FF0000";
          weight = 4;
        }
        this.ChangePolylineStreertColor(ref, color, weight);
      }
      else {
        index = this.markerRefArr.findIndex(ref => ref.props.name === streetName);
        if (index > -1) { //handle marker
          var ref = this.markerRefArr[index];
          var icon;
          if (isBackToBlack) {
            icon = iconPin;
          }
          else { //color
            icon = iconColorfull;
          }
          this.ChangeMarkerStreertColor(ref, icon);
        }
      }
    }
    catch (e) {
      debugger;

    }

  }
  componentDidUpdate = (prevProps) => {
    if (this.props.ColorfullStreet !== prevProps.ColorfullStreet) {
      if (prevProps.ColorfullStreet !== '') {
        this.HandleColroChange(prevProps.ColorfullStreet, true);
      }
      if (this.props.ColorfullStreet !== '') {
        this.HandleColroChange(this.props.ColorfullStreet, false);
      }

    }
  };
  componentDidMount = () => {
  }

  markerRefArr = [];
  polylineRefArr = [];
  setMarkerRefArr = (ref) => {
    this.markerRefArr.push(ref);
  };

  setPolylineRef = (ref) => {
    this.polylineRefArr.push(ref);
  };
  handleToggleOpen(coordinates) {
    debugger;
    this.setState({
      position: {
        coordinates
      }
    })
  }

  render() {
    return (
      <Map
        className={this.props.className}
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: this.state.center.lat,
          lng: this.state.center.lng
        }}
      >
        {this.props.lines.map(({ coordinates, name, link }, index) =>

          <Polyline
            name={name}
            ref={this.setPolylineRef}
            key={index}
            path={coordinates}
            index={index}
            strokeColor={"#000000"}
            strokeOpacity={1.0}
            strokeWeight={3}
            geodesic={true}
            onClick={() => this.handleStreetClicked(link)}
            onMouseover={(e) => { this.handleMouseover(name) }}
            onMouseout={(e) => { this.handleMouseout() }}
          >


          </Polyline>
        )}
        {this.props.points.map(({ coordinates, name, link }, index) =>
          <Marker
            name={name}
            ref={this.setMarkerRefArr}
            key={index}
            position={coordinates[0]}
            icon={iconPin}
            onClick={() => this.handleStreetClicked(link)}
            onMouseover={(e) => { this.handleMouseover(name) }}
            onMouseout={(e) => { this.handleMouseout() }}
          />

        )}
        {this.state.position &&
          <InfoWindow position={this.state.position}>
            <h1>{this.props.location.venue.name}</h1>
          </InfoWindow>
        }
      </Map >
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyA_uIHH16s0jH41ozgp9ekDxht1b5Vc65U',
  language: "he"
})(MapContainer);

