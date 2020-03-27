import React, { Component } from 'react';
import Loader from 'react-loader-spinner'


export class Conclusions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            neighborhoodsCount: [],
            loading: true
        }
    };

    componentDidMount = () => {
        let self = this;
        this.getConculostions()
            .then(res => {
                this.setState({
                    neighborhoodsCount: res.neighborhoodsCount,
                    loading: false
                })
            });

    };
    getConculostions = () => {
        return fetch('https://api.myjson.com/bins/89rfk')
            //fetch('https://localhost:44343/api/App/GetProjectConclusions')
            .then((response) => response.json())
    };

    renderRow = (neiberhood) =>
        <tr >
            <td>{neiberhood.name}</td>
            <td>{neiberhood.data.totalCount}</td>
            <td>{neiberhood.data.namedAfterWomanCount}</td>
            <td>{neiberhood.data.plans}</td>
            <td>{neiberhood.data.averageYearOfApprovement}</td>
        </tr>


    render() {
        return <div className="text-page" >
            <p>
                בעקבות ביצוע הפרוייקט, גילינו מספר נתונים מעניינים על שכונות העיר.<br />
                גילינו שרוב מכריע של שכונות העיר נקראות על שם גברים.
                 מצד שני, ניתן לראות שכונה חדשה שלמה (שכונת כלניות), בה יש רחובות על שמות נשים בלבד, ולכן ישנה גם מגמה מעודדת בנושא זה.<br />
                בנוסף, גילינו מהן שכונות העיר הותיקות, מהן שכונות העיר הגדולות ביותר, ואיזה שכונות עתידות לפני תנופת פיתוח.
            </p>
            <p>
                ניסינו לרכז את הנתונים בטבלה מסכמת, המובאת כאן.<br />
                להורדת נתוני הטבלה כקובץ json,
                לחצו <a target="blank" href="https://api.myjson.com/bins/89rfk">כאן</a>.
            </p>
            {
                this.state.loading ?
                    <div style={{ paddingTop: 50 }}>
                        <Loader
                            type="Rings"
                            color="#00BFFF"
                            height={500}
                            width={1000}
                        />
                    </div>

                    :
                    <table className="table">
                        <thead>

                            <tr>
                                <td>שכונה</td>
                                <td>רחובות</td>
                                <td>קרוי על שם אישה</td>
                                <td>מתוכננים</td>
                                <td>שנת אישור ממוצעת</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.neighborhoodsCount.map(this.renderRow)}
                        </tbody>
                    </table>
            }
        </div >



    }
}
export default Conclusions;