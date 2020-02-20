import React, { Component } from 'react';
import { Select, MenuItem, NativeSelect } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';



export class HeaderSelection extends Component {
    constructor(props) {
        super(props)
    }
    handleChange = event => {
        this.props.onSelectionChanged(event.target.value);
    };


    render() {
        return (
            <div className={this.props.className}>
                <InputLabel className="input" id="mutiple-checkbox-label">{this.props.label}:</InputLabel>
                <Select className="select" onChange={this.handleChange} >
                    {this.props.options.map((option, index) =>
                        <MenuItem key={index} className="select-item" value={option}>{option}</MenuItem>
                    )}
                </Select>
            </div>
        )
    }


}
export default HeaderSelection;