import React, { Component } from 'react';

import './Menu.css';
import { NavLink } from "react-router-dom";



export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };
    render() {
        return <ul className='menu'>
            <li><NavLink exact to="/" activeClassName="active">עמוד ראשי</NavLink ></li>
            <li><NavLink exact to="/map" activeClassName="active">הצגת המפה</NavLink ></li>
            <li><NavLink exact to="/about" activeClassName="active">אודות הפרוייקט</NavLink ></li>
        </ul>
    }
}
export default Menu;
