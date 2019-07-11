import React from 'react';
import Header from './Header';
import {formatPrice} from '../helper';
import axios from 'axios';

class Checkout extends React.Component {

    nameRef = React.createRef();
    emailRef = React.createRef();

    confirmBooking = (e) => {
        e.preventDefault();

        //Update inventory count for picked up room

        const Url = 'https://wayney.herokuapp.com/api/updateInv';
        const updVal = {
            id: `${this.props.location.state.roomDetails._id}`,
            date1: this.props.location.state.date1,
            date2: this.props.location.state.date2
        };

        axios({
            method: 'post',
            url: Url,
            data: updVal
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

        const Url1 = 'https://wayney.herokuapp.com/api/killSession';
        const sessionObj = {
            sessionId: `${this.props.location.state.sesh}`
        };

        axios({
            method: 'delete',
            url: Url1,
            data: sessionObj
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

        if(this.nameRef.current.value && this.emailRef.current.value){
            this.props.history.push(`/complete`, {confId: Date.now(), fullName: this.nameRef.current.value, email: this.emailRef.current.value, roomName: this.props.location.state.roomDetails.name, date1: this.props.location.state.date1, date2: this.props.location.state.date2, price: formatPrice((this.props.location.state.roomDetails.price * this.props.location.state.numNights) * 1.13 * 100)});
        }

    }

    cancelRoom = () => {
        const Url = 'https://wayney.herokuapp.com/api/killSession';
        const sessionObj = {
            sessionId: `${this.props.location.state.sesh}`
        };

        axios({
            method: 'delete',
            url: Url,
            data: sessionObj
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))

        this.props.history.push(`/`, {});

    }

    componentDidMount(){
        //check for session

        const Url = 'https://wayney.herokuapp.com/api/checkSession';
        const sessionObj = {
            sessionId: `${this.props.location.state.sesh}`
        };

        axios({
            method: 'post',
            url: Url,
            data: sessionObj
        })
        .then(data => {
               const  wayneSession = data.data.data;
            if(!wayneSession){ //if no valid session found
                this.props.history.push(`/`, {});
            }else if(this.props.location.state.sesh){
                if(wayneSession.seshId === `${this.props.location.state.sesh}`){
                    console.log('Session is valid');
                }else{
                    this.props.history.push(`/`, {});
                }
            }

        })
        .catch(err => console.log(err))

    }
    
    render(){
        return(
            <div className="check-main">
                <Header/>
            <div className="checkout">
                <div className="room-check-details">
                <h3>Room Details</h3>
                <img src={require(`../images/${this.props.location.state.roomDetails.image}`)} alt="room-img"></img>
                <h3>{this.props.location.state.roomDetails.name}</h3>
                <p>{this.props.location.state.roomDetails.description}</p>
                <p>Stay Dates: {`May ${this.props.location.state.date1}, 2088 - May ${this.props.location.state.date2}, 2088`}</p>
                <p>Number Of Nights: {this.props.location.state.numNights}</p>
                <p>Total for Stay: {formatPrice((this.props.location.state.roomDetails.price * this.props.location.state.numNights) * 1.13 * 100)} <span>CAD</span></p>
                <button onClick={this.cancelRoom}>Cancel</button>
                </div>

                <div className="cart">
                    <img src={require(`../images/butler.png`)} alt="butler-img"></img>
                    <h3>Wayne Hotel</h3>
                    <h1>Cart</h1>
                    <ul className="cart-calc">
                        <li>Subtotal:</li>
                        <li>{formatPrice((this.props.location.state.roomDetails.price * this.props.location.state.numNights) * 100)}</li>
                        <li>Taxes:</li>
                        <li>{formatPrice((this.props.location.state.roomDetails.price * this.props.location.state.numNights) * 0.13 * 100)}</li>
                        <li>Grand Total:</li>
                        <li>{formatPrice((this.props.location.state.roomDetails.price * this.props.location.state.numNights) * 1.13 * 100)}</li>
                    </ul>

                <form className="pay-form" onSubmit={this.confirmBooking}>
                    <input name="name" ref={this.nameRef} type="text" defaultValue="John Doe" disabled={true}/>
                    <input name="card" type="text" defaultValue="4516813184831487" disabled={true}/>
                    <input name="email" ref={this.emailRef} type="text" defaultValue="Johndoe@gmail.com" disabled={true}/>
                    <select name="cards">
                        <option value="VISA">VISA</option>
                        <option value="MC">MC</option>
                        <option value="AMEX">AMEX</option>
                    </select>
                    <button type="submit">Pay Now</button>

                        <div className="row">
                            <div className="column">
                                <img src={require(`../images/visa.jpg`)} alt="visa-img"></img>
                            </div>
                            <div className="column">
                                <img src={require(`../images/mastercard.jpg`)} alt="mc-img"></img>
                            </div>
                            <div className="column">
                                <img src={require(`../images/amex.jpg`)} alt="amex-img"></img>
                            </div>
                        </div>
                </form>
                </div>
            </div>
    
            </div>
        )
    }
}

export default Checkout;

