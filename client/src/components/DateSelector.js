import React from 'react';
import Header from './Header';
import Dates from './Dates';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class DateSelector extends React.Component {

    state = {
        date1: '',
        date2: '',
        NoHigh: false,
        room:'', 
        lockedDates: [],
        dateCheckLock: ''
    };

    componentDidMount(){
        axios('https://wayney.herokuapp.com/api/getData')
      .then((res) => this.setState({roomz: res.data.data}));
    }

    udpateDates = (date) => {
        this.setState({dateCheckLock: ''});
        if(this.state.date1 === date || this.state.date2 === date){ //disallow selection of same date
            this.setState({
                date1: '',
                date2: '',
                NoHigh: false
            });
        }else if(this.state.date1 && this.state.date2){
            if(this.state.date1 === date || this.state.date2 === date){ //disallow selection of same set of dates
                this.setState({
                    date1: '',
                    date2: '',
                    NoHigh: false
                });
            }else {
                this.setState({
                    date1: '',
                    date2: '',
                    NoHigh: false
                });
                this.setState({date1: date});
                this.setState({dateCheckLock: date}); //allow enabled locked date as end date
            } 
        }else if(this.state.date1){
            if(this.state.date1 < date){ //Reorder dates if necessary
                this.setState({date2: date});
            }else {
                this.setState({
                    date1: date,
                    date2: this.state.date1
                });
            }
            this.setState({NoHigh: true});
        }else{
            this.setState({date1: date});
            this.setState({dateCheckLock: date}); //allow enabled locked date as end date
        }
    }

    createDates = () => {
        var dates = [];
        for(var i = 1; i < 32; i++){
            dates.push(i);
        }
        return dates;
    }

    goRoomSelect = (e) => {
        e.preventDefault();

        const date1 = this.state.date1;
        const date2 = this.state.date2;

        // Session Creation
        const returnTime =  () =>{
            return Date.now();
        }
        const getTime = returnTime(); //only executes once
        const Url = 'https://wayney.herokuapp.com/api/createSession';
        const sessionObj = {
            sessionId: getTime
        };

        axios({
            method: 'post',
            url: Url,
            data: sessionObj
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

        if(date1 && date2){ //if both start and end date populated
            if(this.state.lockedDates.length > 0){
                this.state.lockedDates.map((el, index) => {
                    if(this.state.lockedDates[index] > date1 && this.state.lockedDates[index] < date2){ // if locked date b/w period exists
                        NotificationManager.error('Please select a period without a lock. No Availability!', '', 10000);
                        return;
                    }else{
                        this.props.history.push(`/room`, {date1, date2, sesh: getTime});
                    }
                })
            }else{
                this.props.history.push(`/room`, {date1, date2, sesh: getTime});
            }
            
        }
    }

    render(){

        if(!this.state.roomz){
            return(
            <div className="loader">
            <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={250}
            color={'#941615'}
            loading={this.state.loading}
            />
            </div>
            )
        }else{
            return(
                <div className="date-selector">
                    <Header />
                    
    
                    <div className="cal-container">
                    <ul className="calendar">
                    <li className="cal-item cal-day">Su</li>
                    <li className="cal-item cal-day">Mo</li>
                    <li className="cal-item cal-day">Tu</li>
                    <li className="cal-item cal-day">We</li>
                    <li className="cal-item cal-day">Th</li>
                    <li className="cal-item cal-day">Fr</li>
                    <li className="cal-item cal-day">Sa</li>
    
                    {
                        this.createDates().map(el => {
                            var isAvail = false;
                            if(this.state.roomz){ //if data loaded
                                for(var i = 0; i <= 5; i++){ // checking for availablility for 1 dates on roomtype
                                if(this.state.roomz[i].dates[el-1].avail > 0){ //as soon as there's availability on a day
                                    isAvail = true;
                                    break;
                                }
                            }
    
                            if(isAvail === false && !this.state.lockedDates.includes(el)){ //No availability for the date and doesn't already exist in array
                                this.state.lockedDates.push(el);
                            }
    
                            }
    
                            return <Dates index={el} key={el} udpateDates={this.udpateDates} NoHigh={this.state.NoHigh} blockBook={isAvail} dateCheckLock={this.state.dateCheckLock}/>
                        })
                    }
    
                    </ul>
                    <form className="date-edit" onSubmit={this.goRoomSelect}>
                    <div className="dates">
                    <p className="date-top"><span className="date-label">Start Date:</span> <span className="date-actual date-actual-top">{this.state.date1 ? `May ${this.state.date1}, 2088` : 'Enter Date'}</span></p>
                    <p className="date-bottom"><span className="date-label">End Date:</span> <span className="date-actual date-actual-bottom">{this.state.date2 ? `May ${this.state.date2}, 2088` : 'Enter Date'}</span></p>
                    </div>
    
                    <NotificationContainer/>
    
                    <div className="sch-btn">
                        <button>Search</button>
                    </div>
                    </form>
            </div>
                </div>
                
    
            )
        }
    }
}

export default DateSelector;