import React from 'react';
import holiday from './holiday.mp4';
import { Link } from 'react-router-dom';

class MainHero extends React.Component {
    state = {
        hideMenu:true
    };
    
    goToBook = (e) => {
        e.preventDefault();
        
        this.props.history.push('/book');
    }

    toggleMenu = () => {
        this.setState({hideMenu: !this.state.hideMenu});
    }
    
    render() {
        return(
            <div className="main-hero">
            <div className="hero-head">
            <div className="menu-btn-container">
            <button className="menu-btn" onClick={this.toggleMenu}>Menu</button>
                <ul className={`menu-dropdown ${this.state.hideMenu ? 'hide-menu' : ''}`}>
                <li><Link to={`/`} className="menu-items">Home</Link></li>
                <li><Link to={`/book`} className="menu-items">Book Your Stay</Link></li>
                <li><Link to={`/inventory`} className="menu-items">Hotel Inventory</Link></li>
                </ul>
                </div>
                <h1>Wayne Hotel</h1>
            </div> 
            
            <video className="myVideo" loop autoPlay muted>
                <source src={holiday} type="video/mp4" />
            </video>

            <div className="enter">
                <button className="main-book" onClick={this.goToBook}>Book A Room</button>
            </div> 
            </div>
        )
    }
};

export default MainHero;