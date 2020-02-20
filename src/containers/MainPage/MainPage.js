

import React, { Component } from 'react';
import GoogleApiWrapper from './MapContainer/MapContainer.js'
import StreertsList from './StreetsList/StreertsList.js'
import SearchBar from './SearchBar/SearchBar.js'

import './MainPage.css';
export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllStreets: [],
            SelectedDecades: [],
            SelectedNeighborhoods: [],
            WomanStreetsOnly: false,
            DisplayedStreetsLines: [],
            DisplayedStreetsPoints: [],
            DisplayedStreetsNames: [],
            ColorfullStreetName: '',
        }
    };
    componentDidMount = () => {
        this.getStreets().then(jsonData => this.setState({ AllStreets: jsonData.results }))
    };
    getStreets() {
        return fetch('https://localhost:44343/api/App')
            .then(response => response.json())
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })
    };
    handleDecadeChanged(decade) {
        this.UpdateStreetDisplay([decade], this.state.SelectedNeighborhoods, this.state.WomanStreetsOnly);
    }
    handleNeighborhoodChanged(neighborhood) {
        this.UpdateStreetDisplay(this.state.SelectedDecades, [neighborhood], this.state.WomanStreetsOnly);
    }
    handleWomanStreetsOnlyChecked(checkbox) {
        let checked = checkbox.target.checked;
        this.UpdateStreetDisplay(this.state.SelectedDecades, this.state.SelectedNeighborhoods, checked);
    }


    handleStreetClicked = (street) => {

        this.setState({ ColorfullStreetName: this.state.ColorfullStreetName === street ? '' : street })


        var index = this.state.DisplayedStreetsLines.findIndex(x => x.name === street);
        if (index > -1) {
            this.setState(prevState => {
                const newDisplayedStreetsLines = [...prevState.DisplayedStreetsLines];
                newDisplayedStreetsLines[index].color = "#000000";
                return { DisplayedStreetsLines: newDisplayedStreetsLines };
            })
        }
        else {
            index = this.state.DisplayedStreetsPoints.findIndex(x => x.name === street);
            if (index > -1) {
                this.setState(prevState => {
                    const newDisplayedStreetsPoints = [...prevState.DisplayedStreetsPoints];
                    newDisplayedStreetsPoints[index].name = street;
                    return { DisplayedStreetsPoints: newDisplayedStreetsPoints };

                })
            }
        }

    };

    UpdateStreetDisplay = (decades, neighborhoods, womanStreetsOnly) => {
        let lines = [];
        let points = [];
        let names = [];
        this.state.AllStreets.forEach(element => {
            if
                (
                (!decades.length || (decades[0] === ("הכל") || decades.includes(element.decade))) &&
                (!neighborhoods.length || (neighborhoods[0] === ("הכל") || neighborhoods.includes(element.neighborhood))) &&
                (!womanStreetsOnly || element.isNamedAfterWoman)

            ) {
                names.push(element.name);
                var name = element.name.replace('פרופ ', '');
                if (element.coordinates.length === 1) {
                    points.push({ coordinates: element.coordinates, name: name, link: 'https://he.wikipedia.org/wiki/' + name, color: "#FF0000" });
                }
                else {
                    lines.push({ coordinates: element.coordinates, name: name, link: 'https://he.wikipedia.org/wiki/' + name, color: "#FF0000" });

                }

            }
        });

        this.setState(
            {
                DisplayedStreetsLines: lines,
                DisplayedStreetsPoints: points,
                DisplayedStreetsNames: names,
                SelectedDecades: decades,
                SelectedNeighborhoods: neighborhoods,
                WomanStreetsOnly: womanStreetsOnly,
                ColorfullStreetName: ''
            });
    }



    render() {
        return <div className="main-page">
            <SearchBar className="search-bar"
                onDecadeChanged={this.handleDecadeChanged.bind(this)}
                onNeighborhoodChanged={this.handleNeighborhoodChanged.bind(this)}
                onWomanStreetsOnlyChecked={this.handleWomanStreetsOnlyChecked.bind(this)}
            ></SearchBar>
            <div className='main'>
                {this.state.DisplayedStreetsNames.length > 0 &&
                    <StreertsList className="streets-list"
                        streetsList={this.state.DisplayedStreetsNames}
                        handleStreetClicked={this.handleStreetClicked}
                    ></StreertsList>}
                <GoogleApiWrapper
                    className="google-api-wrapper"
                    points={this.state.DisplayedStreetsPoints}
                    lines={this.state.DisplayedStreetsLines}
                    ColorfullStreet={this.state.ColorfullStreetName}
                >

                </GoogleApiWrapper>
            </div>
        </div >
    }
}
export default MainPage;