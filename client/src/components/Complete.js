import React from 'react';
import Header from './Header';

class Complete extends React.Component {
    goHome = () => {
        this.props.history.push(`/`, {});
    }

    render(){
        return(
            <div className="complete-main">
                <Header/>
                <div className="complete">
                    {/* <h1>Payment Received</h1> */}
                    <h1></h1>
                    <p>Hi {this.props.location.state.fullName},</p>
                    <br/>
                    <br/>
                    <p>Thank you for your payment of {this.props.location.state.price}. We appreciated you choosing to stay with us at the Wayne Hotel. We are pleased to confirm your reservation as follows:</p>
                    <ul className="conf-details">
                        <li>Confirmation Number: {'WH'+ this.props.location.state.confId +'792C'}</li>
                        <li>Name: {this.props.location.state.fullName}</li>
                        <li>Accomadations: {this.props.location.state.roomName}</li>
                        <li>Arrival Date: May {this.props.location.state.date1}, 2088</li>
                        <li>Departure Date: May {this.props.location.state.date2}, 2088</li>
                        <li>Check-in Time: 4:00pm</li>
                        <li>Check-out Time: 11:00am</li>
                    </ul>

                    <p>Should you require an early check-in, please make your request as soon as possible. Rates are quoted in CAD funds and subject to applicable province and local taxes. If you find it necessary to cancel this reservation, the Wayne Hotel requires notification by 4:00 P.M. the day before your arrival to avoid a charge for one night's room rate. Whatever we can do to make your visit extra special, call us at 1800.888.8888. We look forward to the pleasure of having you as our guest at the Wayne Hotel.</p>
                    <p>Sincerely,</p>
                    
                    <br/>
                    <br/>

                    <p><strong>Bill Jones</strong></p>
                    <p>Reservations Department</p>
                    <p>1800.888.8888</p>
                    <p>bjones@waynecorp.com</p>

                </div>
                <div className="exit-complete">
                    <button onClick={this.goHome}>Finish</button>
                </div>
            </div>
        )
    }
}

export default Complete;