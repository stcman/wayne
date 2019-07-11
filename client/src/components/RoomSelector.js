import React from 'react';
import Header from './Header';
import axios from 'axios';
import IosDesktop from 'react-ionicons/lib/IosDesktop';
import IosWifi from 'react-ionicons/lib/IosWifi';
import IosWine from 'react-ionicons/lib/IosWine';
import MdGameControllerB from 'react-ionicons/lib/MdGameControllerB';
import MdKey from 'react-ionicons/lib/MdKey';
import IosStar from 'react-ionicons/lib/IosStar';


class RoomsSelector extends React.Component {

    state = {
        rooms: [],
        noAvail: true,
        availCount: 0,
        availRoomsExist: false
    }

    componentDidMount(){
        if(this.props.location.state){
            axios('https://wayney.herokuapp.com/api/getData')
      .then((res) => this.setState({rooms: res.data.data}));

      this.setState({date1: this.props.location.state.date1});
      this.setState({date2: this.props.location.state.date2});
      this.setState({numNights: this.props.location.state.date2 - this.props.location.state.date1});
      this.setState({sesh: this.props.location.state.sesh});
        }else{
            this.props.history.push(`/`, {});
        }
    }

    addToCart = (e) => {
        this.props.history.push(`/check`, {date1: this.state.date1, date2: this.state.date2, numNights: this.state.numNights, roomDetails: this.state.rooms[e.currentTarget.dataset.room], sesh: this.state.sesh});
    }

    render(){
        return(
            <div className="room-select">
                <Header />
                <h1>Availablility for May {this.state.date1}, 2088 - May {this.state.date2}, 2088</h1>
                <ul className="room-list">
                    { 
                        Object.keys(this.state.rooms).map((el, index) => {
                            var day1 = this.state.date1- 1;
                            var day2 = this.state.date2- 1;
                            for(var i = day1; i <= day2; i++){ // checking for availablility for dates
                                if(this.state.rooms[el].dates[i].avail > 0){
                                    var isAvail = true;
                                    this.state.availRoomsExist = true;
                                }else{
                                    var isAvail = false;
                                    break;
                                }
                            }

                            if(isAvail){

                                return <li key={el}>
                                            <div className="room-section">
                                                <img src={require(`../images/${this.state.rooms[el].image}`)} alt="room-img"></img>
                                                <div className="room-details">
                                                    <h2>{this.state.rooms[el].name}</h2>
                                                    <p>{this.state.rooms[el].description}</p>
                                                    <p>{this.state.rooms[el].price}/ Night</p>
                                                    <ul className="room-features">
                                                        <li><IosDesktop/>Flat-screen TV</li>
                                                        <li><IosWifi/>Gigabit Internet</li>
                                                        <li><MdKey/>Executive Lounge access</li>
                                                        <li><IosStar />Hydromassage bathtub</li>
                                                        <li><MdGameControllerB />Gaming Center</li>
                                                        <li><IosWine />Minibar</li>
                                                    </ul>
                                                    <button data-room={el} onClick={this.addToCart}>Book</button>
                                                </div>
                                            </div>
                                        </li>

                            }else if(index === Object.keys(this.state.rooms).length - 1 && !this.state.availRoomsExist){
                                return <div className="no-avail-section" key="avail">
                                    <p>Sorry! There's no availablility for this period. Please try selecting new dates.</p>
                                </div>
                            }
                            
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default RoomsSelector;