import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    state = {
        hideMenu:true
    };

    toggleMenu = () => {
        this.setState({hideMenu: !this.state.hideMenu});
    }

    goHome = ()=> {
        this.props.history.push(`/`, {});
    }

    render(){
        return(
            <div className="head-fix">
                <div className="hero-head">
                <div className="menu-btn-container">
                <button className="menu-btn" onClick={this.toggleMenu}>Menu</button>
                <ul className={`menu-dropdown ${this.state.hideMenu ? 'hide-menu' : ''}`}>
                <li><Link to={`/`} className="menu-items">Home</Link></li>
                <li><Link to={`/book`} className="menu-items">Book Your Stay</Link></li>
                <li><Link to={`/Inventory`} className="menu-items">Hotel Inventory</Link></li>
                </ul>
                </div>
                {/* <button className="login-btn">Login</button> */}
                <h1>Wayne Hotel</h1>
            </div>
            </div>
        )
    }
}

export default Header;