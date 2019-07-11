import React from 'react';
import Header from './Header';
import axios from 'axios';
import Inv from './Inv';

class Inventory extends React.Component {
    state = {
    };

    componentDidMount(){
        axios('https://wayney.herokuapp.com/api/getData')
      .then((res) => this.setState({rooms: res.data.data}));
    }

    createCount = () => {
        var count = [];
        for(var i = 0; i < 6; i++){
            count.push(i);
        }
        return count;
    }

    resetInv = () =>{

        const Url1 = 'https://wayney.herokuapp.com/api/deleteRooms';
        const delVal = {

        };

        axios({
            method: 'delete',
            url: Url1,
            data: delVal
        })
        .then(data =>{
        if(data){ // once delete promise resolved then run post
            const Url = 'https://wayney.herokuapp.com/api/resetInv';
            const updVal = {

            };

            axios({
                method: 'post',
                url: Url,
                data: updVal
            })
            .then(data => {
                if(data){
                    window.location.reload();
                }
            })
            .catch(err => console.log(err))
        }
        })
        .catch(err => console.log(err))


        

        
    }

    render(){
        return(
            <div className="inventory-main">
                <Header/>
                <div className="inv-stats"><h1>Inventory Statistics</h1> <button onClick={this.resetInv}>Reset</button></div>
                <ul className="room-inv-container">
                {
                    this.createCount().map(el => {
                        if(this.state.rooms){
                            return <Inv roomName={this.state.rooms[el].name} roomInv={this.state.rooms[el].dates} />
                        }
                    })
                }
                </ul>
            </div>
        )
    }
}

export default Inventory;