import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';


class GenerateFee extends Component {
    constructor(){
        super();
        this.state = {
            super_name: '',
            mobile: '',
            wardData: [],
            ward_id: '',
            email: '',
            present: '',
            supervisorData: []
        };
        
        this.changeWard = this.changeWard.bind(this);
        //this.changeYear = this.changeYear.bind(this);
        this.handleFeeSubmit = this.handleFeeSubmit.bind(this);
    }

    changeWard(e){
        this.setState({ward_id: e.target.value});
        console.log('ward id', this.state.ward_id);
    }
    /*
    changeYear(e){
        this.setState({year: e.target.value});
        console.log('year change', this.state.year);
    }
    */

    componentWillMount(){
        axios.get('http://10.10.4.36:3001/fcpsward')
        .then((response) => {
        let myward = response.data;
        this.setState({wardData: myward});
        //console.log('ward id', this.state.wardData);
        })
        .catch(function (error) {
        console.log(error);
        });

        axios.get('http://10.10.4.36:3001/fcps_supervisor')
        .then((response) => {
        let mysuperdata = response.data;
        this.setState({supervisorData: mysuperdata});
        console.log('ward data', this.state.wardData);
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    
    
  
  handleFeeSubmit(e) {
    e.preventDefault();
    
    //let finalMonth = this.state.monthof + '-' + this.state.year;

    //console.log(this.state.monthof);
    //console.log('post req');
    
    axios.post('http://10.10.4.36:3001/fcps_supervisor', {
      txtsuper_name: this.refs.txtsupername.value,
      txtmobile: this.refs.txtmobile.value,
      txtemail: this.refs.txtemail.value,
      cmbpresent: this.refs.cmbpresent.value,
      cmbward: this.refs.cmbward.value
    })
    .then(function (response) {
      console.log('insert data', response);
      //this.setState({supervisorData});
    })
    .catch(function (error) {
      console.log(error);
    });    
    //this.props.history.push("/presentstudent");    
}

    render() {
        return(
          <div>
            <Navbar />
            <br />
            <div className="container">
                <h3>Add New FCPS-II Supervisor</h3>

                <form>
                   <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Supervisor Name</label>
                        <input type="text" name="txtsupername" ref="txtsupername" className="form-control form-control-sm" id="validationDefault01" placeholder="Supervisor Name" />
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="inputState">Department</label>
                        <select ref="cmbward" onChange={this.changeWard} className="form-control form-control-sm">
                          {
                            this.state.wardData.map((myclass) => {
                            return <option key={myclass._id}
                              value={myclass._id}>{myclass.ward_name}</option>;
                            })
                          }
                        </select>    
                      </div>                  
                        
                    </div>

                    {/*Second Row*/}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Present</label>
                        <select id="inputState" name="cmbpresent" ref="cmbpresent" className="form-control form-control-sm">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="inputState">Mobile</label>
                        <input type="text" name="txtmobile" ref="txtmobile"  className="form-control form-control-sm" id="validationDefault02" placeholder="Mobile Number" />    
                      </div>                  
                        
                    </div>

                    {/*Third Row*/}
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Email</label>
                        <input type="text" name="txtemail" ref="txtemail"  className="form-control form-control-sm" id="validationDefault02" placeholder="Email Address" />
                      </div>

                      <div className="form-group col-md-6">
                        <label htmlFor="inputState">x</label>
                        <input type="text" name="txtrtmc" disabled ref="txtrtmc" className="form-control form-control-sm" id="validationDefault02" />    
                      </div>                  
                        
                    </div>

                    <button type="submit" onClick={this.handleFeeSubmit} className="btn btn-primary btn-sm">Save Data</button> &nbsp; 
                    <button type="submit" className="btn btn-danger btn-sm">Go Back</button>
                </form>
                  
                  <br /><br/>
                  <h3>All FCPS-II Supervisor List</h3>
                  <table className="table table-sm">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">S#</th>
                        <th scope="col">Department</th>
                        <th scope="col">Supervisor Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Email</th>
                        <th scope="col">Present</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.supervisorData.map((user, i) => 
                      <tr className="tablefontsize" key={user._id}>
                        <td>{i+1}</td>
                        <td>{user.depart_id.ward_name}</td>
                        <td>{user.super_name}</td>
                        <td>{user.mobile}</td>
                        <td>{user.email}</td>
                        <td>{user.ispresent}</td>                                  
                        <td><Link to={`/editfcps/${user._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>              
                      </tr>
                      )}   
                      
                    </tbody>
                  </table>

            </div>
          </div>
        )
    }
}

export default GenerateFee;