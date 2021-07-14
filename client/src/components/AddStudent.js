import React, { Component } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {ip} from './ipaddress';
import axios from 'axios';
const Swal = require('sweetalert2')


//import * as moment from 'moment';
//import Sidebar from './Sidebar';

class AddStudent extends Component {
  constructor(){
    super();

    let myward_id = '';

    this.state = {
      sname: '',
      fname: '',
      classData: [],
      supervisorData: [],
      classid: '',
      supervisorid: '',
      wardid :'',
      error: false
    };

    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getWardId = this.getWardId.bind(this);
    this.supervisorChange = this.supervisorChange.bind(this);
  }

  componentDidMount(){

    // Get FCPS Department
    axios.get('http://' + ip.address + ':3001/fcpsward')
    .then((response) => {
      let myclasses = response.data;
      this.setState({classData: myclasses});
      //console.log('ward', this.state.classData);
    })
    .catch(function (error) {
      console.log(error);
    });

        
  };


  
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({sname: e.target.value});
    
    //console.log(this.state.sname);
  }

  onChange2 = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({fname: e.target.value});
    
    //console.log(this.state.fname);
  }

  _renderError() {
    if (this.state.error) {
    return (
      <div className="alert alert-danger" role="alert">
        {this.state.error}
      </div>
     );
    }
  }

  handleChange(event) {
    this.setState({classid: event.target.value});
    console.log(event.target.value);
  }

  getWardId(e) {
    this.myward_id = e.target.value;
    console.log(this.myward_id);

    this.setState({wardid: e.target.value});
    console.log('wrdid', this.state.wardid);

    // Get FCPS Supervisor
    axios.get('http://' + ip.address + ':3001/depart_supervisor/' + this.myward_id)
    .then((response) => {
      let mysupervisor = response.data;
      this.setState({supervisorData: mysupervisor});
      console.log('supervisor', this.state.supervisorData);
    })
    .catch((error) => {
      console.log('line 99', error);
    });
    //console.log('ward id:', this.state.wardid);
  }

  supervisorChange(event) {
    this.setState({supervisorid: event.target.value});
    console.log('supervisor id:', event.target.value);
  }

  handleTodoSubmit(e) {
    e.preventDefault();
    
    if(this.state.sname.length === 0) {
      this.setState({error: 'Please insert a valid student name to continue'});
      } 
      else {
        this.setState({error: false});

        console.log(this.refs.txtemail.value);
    
    axios.post('http://' + ip.address + ':3001/addmbbs', {
      txtsname: this.state.sname,
      txtfname: this.state.fname,
      txtemail: this.refs.txtemail.value,
      txtmobile : this.refs.txtmobile.value,
      txtdoj: this.refs.txtdoj.value,
      txtdor: this.refs.txtdor.value,
      txtcnic: this.refs.txtcnic.value,
      txtdob: this.refs.txtdob.value,
      txtcmsid: this.refs.txtcmsid.value,
      txtnationality: this.refs.txtnationality.value,
      txtpmdc: this.refs.txtpmdc.value,
      txtrtmc: this.refs.txtrtmc.value,
      cmbgender: this.refs.cmbgender.value,
      cmbdepart: this.refs.cmbdepart.value,
      cmbsupervisor: this.refs.cmbsupervisor.value, 
      txtaddress: this.refs.txtaddress.value, 
      cmbgovt: this.refs.cmbgovt.value,
      cmbpresent: this.refs.cmbpresent.value,
      txtdisciplinary: this.refs.txtdisciplinary.value,
      txtmedboard: this.refs.txtmedboard.value,
      txtdomicile: this.refs.txtdomicile.value,
      txtaccount_no: this.refs.txtaccount_no.value,
      txtremarks: this.refs.txtremarks.value,
      cmbreligion: this.refs.cmbreligion.value,



      /*    
      
      txtaddress: this.refs.txtaddress.value,
      
      txtstartclass: this.refs.txtstartclass.value,
      txtprevious_school: this.refs.txtprevious_school.value,
      txtprevious_school_address: this.refs.txtprevious_school_address.value,
      
      txtfather_qualification: this.refs.txtfather_qualification.value,
      txtfather_cnic: this.refs.txtfather_cnic.value,
      txtfather_mobile: this.refs.txtfather_mobile.value,
      txtfather_email: this.refs.txtfather_email.value,
      txtfather_office: this.refs.txtfather_office.value,
      txtfather_salary: this.refs.txtfather_salary.value
      */
    })
    .then(function (response) {
      console.log(response.data);
      Swal.fire('Data Inserted!', 'Data has been inserted successfully', 'success');
    })
    .catch(function (error) {
      console.log(error);
    })
    .then((response) => {
      this.props.history.push("/presentstudent");
    });
    //this.props.history.push("/presentstudent");  
  }
}
    render() {
      
      var errorMessage = this._renderError();
      
        return (
          
          <div>
          <Navbar />
          
          <div className="container">
            <br />
            <h3>Add New FCPS-II Trainee</h3>

            <div id="myalert" className="alert alert-primary" role="alert">
                Please read carefully before insert that record in database.
            </div>            
            <br />
            <form method="post" action="/addmbbs" onSubmit={this.handleTodoSubmit}>
            
                  <div className="card">
                  <div className="card-header text-primary">
                    STUDENTS INFORMATION
                  </div>
                  <div className="card-body">
                  {/*<!-- First Row -->*/}
                  <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault01" className="text-danger">Student Full Name</label>
                    <input type="text" value={this.state.sname}  onChange={this.onChange} name="txtsname" ref="txtsname" className="form-control form-control-sm" required />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault02" className="text-danger">Father Name</label>
                    <input type="text" value={this.state.fname} onChange={this.onChange2} name="txtfname" ref="txtfname" className="form-control form-control-sm" required />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefaultUsername" className="text-danger">Email</label>                    
                    <input type="email" name="txtemail" ref="txtemail" className="form-control form-control-sm" aria-describedby="inputGroupPrepend2" />
                    
                  </div>

                  <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02" className="text-danger">Mobile</label>
                      <input type="text" name="txtmobile" ref="txtmobile" className="form-control form-control-sm" />
                  </div>
            </div>


            {/*<!-- Second Row -->*/}
            <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01" className="text-danger">Date of Joining</label>
                      <input type="date" name="txtdoj" ref="txtdoj" className="form-control form-control-sm" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02" className="text-danger">Date of Relieving</label>
                      <input type="date" name="txtdor" ref="txtdor" className="form-control form-control-sm" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefaultUsername" className="text-danger">CNIC</label>                    
                      <input type="text" name="txtcnic" ref="txtcnic" className="form-control form-control-sm" aria-describedby="inputGroupPrepend2" />
                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">Date of Birth</label>
                        <input type="date" name="txtdob" ref="txtdob" className="form-control form-control-sm" />
                    </div>
                  </div>

                  {/*<!-- Third Row -->*/}
                  <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01">CMS ID</label>
                      <input type="text" name="txtcmsid" ref="txtcmsid" className="form-control form-control-sm" placeholder="CMS PG ID" />                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Nationality</label>
                      <input type="text" name="txtnationality" ref="txtnationality" placeholder="Your Nationality" className="form-control form-control-sm" />                                         
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefaultUsername">PMCD #</label>                    
                      <input type="text" name="txtpmdc" ref="txtpmdc"  className="form-control form-control-sm" placeholder="PMDC Number" />
                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">RTMC #</label>
                        <input type="text" name="txtrtmc" ref="txtrtmc"  className="form-control form-control-sm" placeholder="RTMC Number" />
                    </div>
                  </div>


  

                  {/*<!-- Forth Row -->*/}
                  <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01" className="text-danger">Gender</label>
                      <select id="inputState" name="cmbgender" ref="cmbgender" className="form-control form-control-sm">
                          <option>MALE</option>
                          <option>FEMALE</option>
                      </select>
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02" className="text-danger">Department</label>

                      <select ref="cmbdepart" onChange={this.getWardId} className="form-control form-control-sm">
                          <option value="SELECT WARD">SELECT WARD</option>
                          {
                            this.state.classData.map((myclass) => {
                            return <option key={myclass._id}
                              value={myclass._id}>{myclass.ward_name}</option>;
                            })
                          }
                      </select>                     
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02" className="text-danger">Supervisor</label>

                      <select ref="cmbsupervisor" onChange={this.supervisorChange} className="form-control form-control-sm">
                          {
                            this.state.supervisorData.map((myclass) => {
                            return <option key={myclass._id} value={myclass._id}>{myclass.super_name}</option>;
                            })
                          }
                      </select>
                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02" className="text-danger">Address</label>
                        <input type="text" name="txtaddress" ref="txtaddress"  className="form-control form-control-sm" id="validationDefault02" />
                    </div>
                  </div>

                  {/*<!-- Fifth Row --> */}
                <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01">Disciplinary Action</label>
                      <input type="text" name="txtdisciplinary" ref="txtdisciplinary" className="form-control form-control-sm" placeholder="Disciplinary Action" id="validationDefault01" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Medical Board</label>
                      <input type="text" name="txtmedboard" ref="txtmedboard" className="form-control form-control-sm" id="validationDefault02" placeholder="Medical Board" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefaultUsername" className="text-danger">Domicile</label>                    
                      <input type="text" name="txtdomicile" ref="txtdomicile" className="form-control form-control-sm" aria-describedby="inputGroupPrepend2" required />                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">Account #</label>
                        <input type="text" name="txtaccount_no" ref="txtaccount_no" className="form-control form-control-sm" placeholder="Account Number" />
                    </div>
                  </div>


                  {/*<!-- Six Row -->*/}
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Government</label>
                    <select id="inputState" name="cmbgovt" ref="cmbgovt" className="form-control form-control-sm">
                      <option>NO</option>
                      <option>YES</option>                      
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Present Status</label>                    
                    <select id="inputState" name="cmbpresent" ref="cmbpresent" className="form-control form-control-sm">
                      <option>WORKING</option>
                      <option>COMPLETE</option>
                      <option>LEFT</option>
                      <option>RESIGN</option>
                    </select>                  
                  </div>


                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault04">Religion:</label>
                    <select id="inputState" name="cmbreligion" ref="cmbreligion" className="form-control form-control-sm">
                      <option value="Muslim">MUSLIM</option>
                      <option value="Non Muslim">NON MUSLIM</option>                      
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault05">Remarks</label>
                    <input type="text" name="txtremarks" ref="txtremarks" className="form-control form-control-sm" placeholder="Student Remarks" />
                  </div>

                </div>

                {/*<!-- Seven Row -->*/}
                {/*}
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Father Mobile</label>
                    <input type="text" disabled name="txtfather_mobile" ref="txtfather_mobile"  className="form-control form-control-sm" id="validationDefault03" placeholder="Father Mobile" />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Father Email</label>                    
                    <input type="text" disabled name="txtfather_email" ref="txtfather_email"  className="form-control form-control-sm" id="validationDefault03" placeholder="Father Email" />                                      
                  </div>


                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault04">Father Office Address</label>
                    <input type="text" disabled name="txtfather_office" ref="txtfather_office"  className="form-control form-control-sm" id="validationDefault04" placeholder="Father Office" />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault05">Father Salary</label>
                    <input type="text" disabled name="txtfather_salary" ref="txtfather_salary"  className="form-control form-control-sm" id="validationDefault05" placeholder="Father Salary" />
                  </div>

                </div>
                        */}

                {/*<!-- Forth Row -->*/}
                {/*
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Father Salary</label>
                    <input type="text" name="txtseat_number" className="form-control form-control-sm" id="validationDefault03" placeholder="Seat Number" />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Father Email</label>                    
                    <select id="inputState" name="cmbpresent" className="form-control form-control-sm">
                      <option value="Yes" selected>Yes</option>
                      <option value="No">No</option>
                    </select>                  
                  </div>


                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault04">Father Qualification</label>
                    <input type="text" name="txtbook_color" className="form-control form-control-sm" id="validationDefault04" placeholder="Book Color" />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault05">CNIC</label>
                    <input type="text" name="txtbook_number" className="form-control form-control-sm" id="validationDefault05" placeholder="Book Number" />
                  </div>

                </div>
                */}

                <button id="btnSubmit" className="btn btn-primary btn-sm" type="submit">Insert Data</button>&nbsp;
                <button type="reset" className="btn btn-danger btn-sm">Clear Form</button>

                </div>
              </div>
                
            </form>
            <br /><br />{errorMessage}
          </div> 
          <Footer />         
          </div>
          
          
        )
    }
}

export default AddStudent;