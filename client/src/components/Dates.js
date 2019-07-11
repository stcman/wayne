import React from 'react';
import IosLock from 'react-ionicons/lib/IosLock';

class Dates extends React.Component {
    state = {
        isHigh: false
    };

    toggleHigh = () => {
        this.props.udpateDates(parseInt(this.props.index));
        this.setState({ isHigh: !this.state.isHigh });
      }

      componentWillReceiveProps() { //based on prop update (prop's state in this case)
            if(this.state.isHigh === true && this.props.NoHigh === true){
              this.setState({isHigh: !this.state.isHigh});
          }

          
      }

    render(){
        const {isHigh} = this.state;

        

            if(!this.props.blockBook){
                if(this.props.dateCheckLock !== '' && this.props.dateCheckLock < this.props.index || isHigh){
                    return(
                        <div className="dates">
                            <li className={`date-${this.props.index} cal-item cal-num ${isHigh ? 'cal-high' : ''}`} onClick={this.toggleHigh}><IosLock fontSize="60px"/></li>
                        </div>
                    )
                }
                return(
                    <div className="dates">
                        <li className={`date-${this.props.index} cal-item cal-num`}><IosLock fontSize="60px"/></li>
                    </div>
                )
            }else{
                return(
                    <div className="dates">
                        <li className={`date-${this.props.index} cal-item cal-num ${isHigh ? 'cal-high' : ''}`} onClick={this.toggleHigh}>{this.props.index}</li>
                    </div>
                )
            }
    }
}

export default Dates;