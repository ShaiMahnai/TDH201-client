

import React, { Component } from 'react';
import GoogleApiWrapper from './MapContainer/MapContainer.js'
import StreertsList from './StreetsList/StreertsList.js'
import SearchBar from './SearchBar/SearchBar.js'
import Loader from 'react-loader-spinner'


import './MapPage.css';
export class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            AllStreets: [],
            SelectedDecades: [],
            SelectedNeighborhoods: [],
            WomanStreetsOnly: false,
            PlannedStreetsOnly: false,
            DisplayedStreetsLines: [],
            DisplayedStreetsPoints: [],
            DisplayedStreetsNames: [],
            ColorfullStreetName: '',
        }
    };
    componentDidMount = () => {
        let self = this;
        this.getStreets()
            .then(function (jsonData) {
                self.setState({ AllStreets: jsonData.results, loading: false });
            })
            .catch((error) => console.error(error))
    };
    getStreets() {
        return fetch('https://api.myjson.com/bins/f60p8')
            //fetch('https://localhost:44343/api/App')
            .then((response) => response.json())
    };
    handleDecadeChanged(decade) {
        this.UpdateStreetDisplay([decade], this.state.SelectedNeighborhoods, this.state.WomanStreetsOnly, this.state.PlannedStreetsOnly);
    }
    handleNeighborhoodChanged(neighborhood) {
        this.UpdateStreetDisplay(this.state.SelectedDecades, [neighborhood], this.state.WomanStreetsOnly, this.state.PlannedStreetsOnly);
    }
    handleWomanStreetsOnlyChecked(checkbox) {
        let checked = checkbox.target.checked;
        this.UpdateStreetDisplay(this.state.SelectedDecades, this.state.SelectedNeighborhoods, checked, this.state.PlannedStreetsOnly);
    }
    handlePlannedStreetsOnlyChecked(checkbox) {
        let checked = checkbox.target.checked;
        this.UpdateStreetDisplay(this.state.SelectedDecades, this.state.SelectedNeighborhoods, this.state.WomanStreetsOnly, checked);
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

    UpdateStreetDisplay = (decades, neighborhoods, womanStreetsOnly, plannedStreetsOnly) => {
        let lines = [];
        let points = [];
        let names = [];
        this.state.AllStreets.forEach(element => {
            if
                (
                (!decades.length || (decades[0] === ("הכל") || decades.includes(element.Decade))) &&
                (!neighborhoods.length || (neighborhoods[0] === ("הכל") || neighborhoods.includes(element.Neighborhood))) &&
                (!womanStreetsOnly || element.IsNamedAfterWoman) &&
                (!plannedStreetsOnly || !element.Exist)

            ) {
                names.push(element.Name);
                var name = element.Name.replace('פרופ ', '');
                if (element.Coordinates.length === 1) {
                    points.push({ coordinates: element.Coordinates, name: name, link: 'https://he.wikipedia.org/wiki/' + name, color: "#FF0000" });
                }
                else {
                    lines.push({ coordinates: element.Coordinates, name: name, link: 'https://he.wikipedia.org/wiki/' + name, color: "#FF0000" });

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
                PlannedStreetsOnly: plannedStreetsOnly,
                ColorfullStreetName: ''
            });
    }



    render() {
        return <div>
            {this.state.loading ?
                <div style={{ paddingTop: 50 }}>
                    <Loader
                        type="Rings"
                        color="#00BFFF"
                        height={500}
                        width={1000}
                    />
                </div>

                :
                <div className="main-page">
                    <SearchBar className="search-bar"
                        onDecadeChanged={this.handleDecadeChanged.bind(this)}
                        onNeighborhoodChanged={this.handleNeighborhoodChanged.bind(this)}
                        onWomanStreetsOnlyChecked={this.handleWomanStreetsOnlyChecked.bind(this)}
                        onPlannedSreetsChecked={this.handleWomanStreetsOnlyChecked.bind(this)}
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
        </div>

    }
}
export default MapPage;