import React, { Component } from 'react';

import './Menu.css';
import { Link } from "react-router-dom";



export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };
    render() {
        return <ul className='menu'>
            <li><Link to="/">עמוד ראשי</Link></li>
            <li><Link to="/about">אודות הפרוייקט</Link></li>
        </ul>
    }
}
export default Menu;
