import React, { Component } from 'react';
import { Marker } from 'google-maps-react';


var iconPin = {
    path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
    fillColor: "#FF0000",
    fillOpacity: 1,
    scale: 0.01, //to reduce the size of icons
};

export class MapContainerMarker extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Marker
                position={this.props.position}
                color="blue"
                icon={iconPin}
                onClick={this.props.handleStreetClicked}
                onMouseover={this.props.handleMouseover}
                onMouseout={this.props.handleMouseou}
            />
        )
    }


}
export default MapContainerMarker;