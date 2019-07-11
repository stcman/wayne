import React from 'react';

class Inv extends React.Component {

    createDates = () => {
        var dates = [];
        for(var i = 0; i < 31; i++){
            dates.push(i);
        }
        return dates;
    }

    render(){
        return(
            <div className="inv-items-main">
                <h2>{this.props.roomName}</h2>
                <div className="inv-items">
                    {
                        this.createDates().map(el => {
                            return (
                            <li className="inv-avail">
                                <div>May {this.props.roomInv[el].date}, 2088</div><div>{this.props.roomInv[el].avail} left.</div>
                            </li>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Inv;