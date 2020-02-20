import React, { Component } from 'react';
import HeaderSelection from './HeaderSelection'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import './SearchBar.css';


export class SearchBar extends Component {
    GetAvailableSelections() {
        return fetch('https://localhost:44343/api/App/GetAvailableSelections')
            .then(response => response.json())
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })
    };

    componentDidMount = () => {
        this.GetAvailableSelections().then(
            jsonData => this.setState(
                {
                    availableDecades: ['הכל'].concat(jsonData.decades),
                    availableNeighborhoods: ['הכל'].concat(jsonData.neighborhoods)
                }))
    };


    constructor(props) {
        super(props)
        this.state =
        {
            availableDecades: [],
            availableNeighborhoods: []
        }
    }
    render() {
        return (
            <div className={this.props.className}>
                <HeaderSelection className="select-wrapper" label={'בחירת עשור'} options={this.state.availableDecades}
                    onSelectionChanged={value => this.props.onDecadeChanged(value)}></HeaderSelection>
                <HeaderSelection className="select-wrapper" label={'בחירת שכונה'} options={this.state.availableNeighborhoods}
                    onSelectionChanged={value => this.props.onNeighborhoodChanged(value)}></HeaderSelection>
                <FormControlLabel
                    control={
                        <Checkbox onChange={value => this.props.onWomanStreetsOnlyChecked(value)} value="secondary" color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    }
                    label="על שם נשים בלבד"
                />
            </div>
        )
    }


}
export default SearchBar;