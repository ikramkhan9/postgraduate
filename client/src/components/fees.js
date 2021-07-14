import React, { Component } from 'react';
import Navbar from './Navbar';

class Fees extends Component {

  operate(){
    console.log('Fee Page');
  }
    render() {
        return (
          <div>  
            <Navbar />
          <div className="text-center">
            <h2>Students Monthly Fee</h2>
          </div>

          </div>
        )
    }
}

export default Fees;