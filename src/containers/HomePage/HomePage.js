import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
export class HomePage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return <div className="mainPage" >
            <p>ברוכים הבאים</p>
            <p>באתר זה מוצגת התפתחות העיר באר שבע לפי שכונות העיר.</p>
            <p>על ידי לחיצה על <NavLink exact to="/map" activeClassName="active">הצגת המפה</NavLink >, ניתן לראות את מפת העיר.<br />
                משם ניתן לבחור את המידע שברצונכם להציג, בעזרת תפריט הניוט העליון.</p>
            תהנו!

        </div>

    }
}

export default HomePage;