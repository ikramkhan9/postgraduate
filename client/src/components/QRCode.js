import React, { Component } from 'react';
import Navbar from './Navbar';

import axios from 'axios';

class QRCode extends Component {
  constructor(props){
    super(props);

    this.state = {
      qrcode: '',
    };
    this.myqr = [];
    this.handleChange = this.handleChange.bind(this);    

    let payload = {
      attendance_list: [{atten_in: '2010-05-09', atten_out: '2018-01-09', status:'Present'}]
    }
  }


  handleChange(event) {
    this.myqr.push(event.target.value);
    
    this.setState({qrcode: event.target.value});
    let idLen = this.myqr.length;

    if(idLen === 24){
 
      console.log('qr len', this.myqr[23]);
      this.setState({qrcode: this.myqr[23]});

      ///console.log('Final State', this.state.qrcode);

      

      axios.post('http://localhost:3001/qrcode/' , {
        //txtqrcode: this.myqr[23]
        txtqrcode: this.payload
      })
      .then(function (response) {
         console.log('qr posted', response);  
         //console.log('inner', this.myqr[23]);   
         
         //this.myqr = [];
         //this.myqr.length = 0;
      })
      .catch(function (error) {
         console.log(error);
      });    
      this.setState({qrcode: ''});    
      this.myqr = []; 
      

    }   
  }

  

  
   render() {
        return (
          
          <div>
          <Navbar />
          
          <div className="container">
            <br />
            <h2>Student QR Attendance</h2>
            <div className="alert alert-primary" role="alert">
                Please scan the QR Code for daily basis attendance reacord.
            </div>
            
            <br />
            <form method="post" action="/addmbbs" id="form1">
              <div className="card">
                  <div className="card-header text-primary">
                    Students QR Attendance
                  </div>
                  <div className="card-body">                  
                      <div className="form-row">
                          <div className="col-md-3 mb-3">
                            <label htmlFor="validationDefaultUsername">QRCode</label>                    
                              <input type="text" name="txtqrcode" ref="txtqrcode" value={this.state.qrcode} onChange={this.handleChange} id="txtemail" className="form-control form-control-sm" placeholder="QR Code" aria-describedby="inputGroupPrepend2" />
                          </div>  
                      </div>                      
                  </div>
              </div>
                
            </form>
            <br /><br />
          </div>         
          </div>

          
        )
    }
}

export default QRCode;