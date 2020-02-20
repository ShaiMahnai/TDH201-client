import React, { Component } from 'react';
import './StreertsList.css';


export class StreertsList extends Component {
    componentDidMount = () => {
        this.props.streetsList.sort();

    };
    componentDidUpdate = () => {
        this.props.streetsList.sort();
    }

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <div className={this.props.className}>
                <span className='title'>רשימת הרחובות:</span>
                <ul>
                    {this.props.streetsList.map((street, index) =>

                        <li key={index} onClick={(e) => this.props.handleStreetClicked(street)}>
                            {street}
                        </li>
                    )}
                </ul>
            </div>
        )
    }


}
export default StreertsList;