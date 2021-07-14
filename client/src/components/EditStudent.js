import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import {ip} from './ipaddress';

let dateFormat = require('dateformat');
//import { browserHistory } from "react-router-dom";


class AddStudent extends Component {
  constructor(props){
    super(props);

    //this.state={user_id: this.props.match.params.user_id,
    this.state = {
      sname: '',
      fname: '',
      mobile: '',
      email: '',
      doj: null,
      dor: null,
      cnic: '',
      dob: null,
      cmsid: '',
      nationality: '',
      pmdc: '',
      rtmc: '',
      gender: '',
      depart: '',
      supervisor: '',
      address: '',
      disciplinary: '',
      med_board: '',
      domicile: '',
      acc_no: '',
      govt: '',
      present: '',
      religion: '',
      remarks: '',

      classData: [],
      supervisorData: [],
      classid: '',
      supervisorid: '',
      wardid :'',      
    };

    this.onChange = this.onChange.bind(this);
    this.onChange2 = this.onChange2.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleChange(event) {
    //event.preventDefault();
    if(event.target.name === 'txtmobile'){
      this.setState({mobile: event.target.value});
    }
    if(event.target.name === 'txtemail'){
      this.setState({email: event.target.value});
    }       
    if(event.target.name === 'txtdoj'){
      this.setState({doj: event.target.value });
    }
    if(event.target.name === 'txtdor'){
      this.setState({dor: event.target.value});
    }
    if(event.target.name === 'txtcnic'){
      this.setState({cnic: event.target.value});
    }
    if(event.target.name === 'txtdob'){
      this.setState({dob: event.target.value});
      console.log('date: ', dateFormat(event.target.value, 'yyyy-mm-dd'));
    }
    if(event.target.name === 'txtcmsid'){
      this.setState({cmsid: event.target.value});
    }
    if(event.target.name === 'txtnationality'){
      this.setState({nationality: event.target.value});
    }
    if(event.target.name === 'txtpmdc'){
      this.setState({pmdc: event.target.value});
    }
    if(event.target.name === 'txtrtmc'){
      this.setState({rtmc: event.target.value});
    }
    if(event.target.name === 'cmbgender'){
      this.setState({gender: event.target.value});
    }
    

    if(event.target.name === 'cmbdepart'){

      console.log('before depart id: ', this.state.depart);
      this.setState({depart: event.target.value});
      console.log('after depart id: ', this.state.depart);

      //this.setState({supervisorData: null});

      axios.get('http://' + ip.address + ':3001/fcps_supervisor/')
      .then((response) => {
        let mysupervisor = response.data;
        this.setState({supervisorData: mysupervisor});

        console.log('supervisor id: ', this.state.supervisorData[0]._id);
        console.log('supervisor', this.state.supervisorData);
        })
        .catch((error) => {
          console.log('line 140', error);
        });
      }


    if(event.target.name === 'cmbsupervisor'){
      this.setState({supervisor: event.target.value});
      console.log('super id: ', this.state.supervisor);
    }
    if(event.target.name === 'txtaddress'){
      this.setState({address: event.target.value});
    }
    if(event.target.name === 'txtdisciplinary'){
      this.setState({disciplinary: event.target.value});
    }
    if(event.target.name === 'txtmedboard'){
      this.setState({med_board: event.target.value});
    }
    if(event.target.name === 'txtdomicile'){
      this.setState({domicile: event.target.value});
    }
    if(event.target.name === 'txtaccount_no'){
      this.setState({acc_no: event.target.value});
    }
    if(event.target.name === 'cmbgovt'){
      this.setState({govt: event.target.value});
    }
    if(event.target.name === 'cmbpresent'){
      this.setState({present: event.target.value});
    }
    if(event.target.name === 'cmbreligion'){
      this.setState({religion: event.target.value});
    }
    if(event.target.name === 'txtremarks'){
      this.setState({remarks: event.target.value});
    }
    
    
     
  }
  
  goBack(){
    this.props.history.push('/presentstudent');
  }

  // getWardId(e) {
  //   this.myward_id = e.target.value;
  //   console.log(this.myward_id);

  //   this.setState({wardid: e.target.value});
  //   console.log('wrdid', this.state.wardid);

  //   // Get FCPS Supervisor
  //   axios.get('http://10.10.4.36:3001/depart_supervisor/' + this.myward_id)
  //   .then((response) => {
  //     let mysupervisor = response.data;
  //     this.setState({supervisorData: mysupervisor});
  //     console.log('supervisor', this.state.supervisorData);
  //   })
  //   .catch((error) => {
  //     console.log('line 99', error);
  //   });
  //   //console.log('ward id:', this.state.wardid);
  // }


  componentDidMount(){

    axios.get('http://' + ip.address + ':3001/fcpsward')
    .then((response) => {
      let myclasses = response.data;
      this.setState({classData: myclasses});
      //console.log('ward', this.state.classData);
    })
    .catch((error) => {
      console.log(error);
    });

    //var str = "12345.00";
    //str = str.substring(0, str.length - 1);
    //----------------------------
   
    axios.get('http://' + ip.address + ':3001/editstudent/' + this.props.match.params.id)
      .then((response) => {
      
      this.setState({formValues: response.data});
      //console.log('Student Data', this.state.formValues);
      console.log('d:', this.state.formValues.do_birth);

      

      axios.get('http://' + ip.address + ':3001/depart_supervisor/' + this.state.formValues.depart_id)
      .then((response) => {
        let mysupervisor = response.data;
        this.setState({supervisorData: mysupervisor});

        console.log('supervisor id: ', this.state.supervisorData[0]._id);
        console.log('supervisor', this.state.supervisorData);
      })
      .catch((error) => {
        console.log('line 140', error);
      });

    //-------------

      this.setState({sname: this.state.formValues.sname,
        fname: this.state.formValues.fname, 
        mobile : this.state.formValues.mobile,
        email: this.state.formValues.email,
        doj: dateFormat(this.state.formValues.doj, 'yyyy-mm-dd'), // dateFormat(this.state.formValues.doj, 'yyyy-mm-dd'),
        dor: dateFormat(this.state.formValues.dor, 'yyyy-mm-dd'),  //this.state.formValues.dor,
        cnic: this.state.formValues.cnic,
        dob: dateFormat(this.state.formValues.do_birth, 'yyyy-mm-dd'),
        cmsid: this.state.formValues.cmsid,      
        nationality: this.state.formValues.nationality,  
        pmdc: this.state.formValues.pmdc_no,
        rtmc: this.state.formValues.rtmc_no,
        gender: this.state.formValues.gender,
        depart: this.state.formValues.depart_id,
        supervisor: this.state.formValues.supervisor_id,
        address: this.state.formValues.address,
        disciplinary: this.state.formValues.dis_action,
        med_board: this.state.formValues.med_board,
        domicile : this.state.formValues.domicile,
        acc_no: this.state.formValues.account_no,
        govt: this.state.formValues.govt,
        present: this.state.formValues.ispresent,
        religion: this.state.formValues.religion,
        remarks: this.state.formValues.remarks,

      })
      
      // this.setState({
      //   txtfname: this.state.fname,
      //   txtemail: this.refs.txtemail.value,
      //   txtmobile : this.refs.txtmobile.value,
      //   txtdoj: this.refs.txtdoj.value,
      //   txtdor: this.refs.txtdor.value,
      //   txtcnic: this.refs.txtcnic.value,
      //   txtdob: this.refs.txtdob.value,
      //   txtcmsid: this.refs.txtcmsid.value,
      //   txtnationality: this.refs.txtnationality.value,
      //   txtpmdc: this.refs.txtpmdc.value,
      //   txtrtmc: this.refs.txtrtmc.value,
      //   cmbgender: this.refs.cmbgender.value,
      //   cmbdepart: this.refs.cmbdepart.value,
      //   cmbsupervisor: this.refs.cmbsupervisor.value, 
      //   txtaddress: this.refs.txtaddress.value, 
      //   cmbgovt: this.refs.cmbgovt.value,
      //   cmbpresent: this.refs.cmbpresent.value,
      //   txtdisciplinary: this.refs.txtdisciplinary.value,
      //   txtmedboard: this.refs.txtmedboard.value,
      //   txtdomicile: this.refs.txtdomicile.value,
      //   txtaccount_no: this.refs.txtaccount_no.value,
      //   txtremarks: this.refs.txtremarks.value,
      //   })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = (e) => {    

    this.setState({sname: e.target.value});    
    //console.log(this.state.sname);
  }

  onChange2 = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    this.setState({fname: e.target.value});
    
    //console.log(this.state.fname);
  }
  
  handleTodoSubmit(e) {
    e.preventDefault();
    
    axios.post('http://' + ip.address + ':3001/editstudent/' + this.props.match.params.id , {
      txtsname: this.state.sname,
      txtfname: this.state.fname,
      txtmobile : this.state.mobile,
      txtemail: this.state.email,      
      txtdoj: this.state.doj,
      txtdor: this.state.dor,
      txtcnic: this.state.cnic,
      txtdob: this.state.dob,
      txtcmsid: this.state.cmsid,
      txtnationality: this.state.nationality,
      txtpmdc: this.state.pmdc,
      txtrtmc: this.state.rtmc,
      cmbgender: this.state.gender,
      cmbdepart: this.state.depart,
      cmbsupervisor: this.state.supervisor,
      txtaddress: this.state.address,
      txtdisciplinary: this.state.disciplinary,
      txtmedboard: this.state.med_board,

      txtdomicile: this.state.domicile,
      txtaccount_no: this.state.acc_no,
      cmbgovt: this.state.govt,
      cmbpresent: this.state.present,
      cmbreligion: this.state.religion,
      txtremarks: this.state.remarks,
      
    })
    .then((response) => {
      console.log('posted: ', response);
      swal("Record Updated!", "Your record has been updated in database!", "success");
    })
    .catch((error) => {
      console.log(error);
    })
    .then((response) => {
      this.props.history.push("/presentstudent");
    })
    
}

  render() {
      //console.log('email state', this.state.email);
      
        return (          
          <div>
            <Navbar />
          
            <div className="container">
              <br />
              <h2>Update Student Record</h2>              

              <div className="alert alert-primary" role="alert">
                  Please read one time carefully before update that record.
              </div>

              <button type="button" style={{marginBottom: '10px'}} onClick={this.goBack} className="btn btn-danger float-right btn-sm"><i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back</button>
              
              <br /><br />

              <form method="post" action="/addmbbs" onSubmit={this.handleTodoSubmit}>

                  <div className="card">
                  <div className="card-header text-primary">
                    UPDATE STUDENT INFORMATION
                  </div>
                  <div className="card-body">
                  {/*<!-- First Row -->*/}
                  <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault01">Student Full Name</label>
                    <input type="text" value={this.state.sname}  onChange={this.onChange} name="txtsname" className="form-control form-control-sm" required />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault02">Father Name</label>
                    <input type="text" value={this.state.fname} onChange={this.onChange2} name="txtfname" className="form-control form-control-sm" required />
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefaultUsername">Email</label>                    
                    <input type="email" name="txtemail" value={this.state.email} onChange={this.handleChange} className="form-control form-control-sm" aria-describedby="inputGroupPrepend2" />
                    
                  </div>

                  <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Mobile</label>
                      <input type="text" name="txtmobile" value={this.state.mobile} onChange={this.handleChange} className="form-control form-control-sm" />
                  </div>
            </div>


            {/*<!-- Second Row -->*/}
            <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01">Date of Joining</label>
                      <input type="date" name="txtdoj" value={ this.state.doj } onChange={this.handleChange} className="form-control form-control-sm" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Date of Relieving</label>
                      <input type="date" name="txtdor" value={ this.state.dor } onChange={this.handleChange} className="form-control form-control-sm" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefaultUsername">CNIC</label>                    
                      <input type="text" name="txtcnic" value={this.state.cnic} onChange={this.handleChange} className="form-control form-control-sm" aria-describedby="inputGroupPrepend2" />
                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">Date of Birth</label>
                        <input type="date" name="txtdob" value={ this.state.dob } onChange={this.handleChange} className="form-control form-control-sm" />
                    </div>
                  </div>

                  {/*<!-- Third Row -->*/}
                  <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01">CMS ID</label>
                      <input type="text" name="txtcmsid" value={this.state.cmsid} onChange={this.handleChange} className="form-control form-control-sm" />                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Nationality</label>
                      <input type="text" name="txtnationality" value={this.state.nationality} onChange={this.handleChange} className="form-control form-control-sm" />                                         
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefaultUsername">PMCD #</label>                    
                      <input type="text" name="txtpmdc" value={this.state.pmdc} onChange={this.handleChange} className="form-control form-control-sm"  />
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">RTMC #</label>
                        <input type="text" name="txtrtmc" value={this.state.rtmc} onChange={this.handleChange} className="form-control form-control-sm"  />
                    </div>
                  </div>


  

                  {/*<!-- Third Row -->*/}
                  <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01">Gender</label>
                      <select id="inputState" value={this.state.gender} onChange={this.handleChange} name="cmbgender"  className="form-control form-control-sm">
                          <option>MALE</option>
                          <option>FEMALE</option>
                      </select>
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Department</label>

                      <select name="cmbdepart" value={this.state.depart} onChange={this.handleChange} className="form-control form-control-sm">
                          
                          {
                            this.state.classData.map((myclass) => {
                            return <option key={myclass._id}
                              value={myclass._id}>{myclass.ward_name}</option>;
                            })
                          }
                      </select>                     
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Supervisor</label>

                      <select name="cmbsupervisor" value={this.state.supervisor} onChange={this.handleChange} className="form-control form-control-sm">
                          {
                            this.state.supervisorData.map((myclass) => {
                            return <option key={myclass._id} value={myclass._id}>{myclass.super_name} - {myclass.depart_id.ward_name} </option>;
                            })
                          }
                      </select>
                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">Address</label>
                        <input type="text" name="txtaddress" value={this.state.address} onChange={this.handleChange} className="form-control form-control-sm" id="validationDefault02" />
                    </div>
                  </div>

                  {/*<!-- Forth Row --> */}
                <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault01">Disciplinary Action</label>
                      <input type="text" name="txtdisciplinary" value={this.state.disciplinary} onChange={this.handleChange} className="form-control form-control-sm" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefault02">Medical Board</label>
                      <input type="text" name="txtmedboard" value={this.state.med_board} onChange={this.handleChange} className="form-control form-control-sm" />
                    </div>
  
                    <div className="col-md-3 mb-3">
                      <label htmlFor="validationDefaultUsername">Domicile</label>                    
                      <input type="text" name="txtdomicile" value={this.state.domicile} onChange={this.handleChange} className="form-control form-control-sm" aria-describedby="inputGroupPrepend2" />                      
                    </div>
  
                    <div className="col-md-3 mb-3">
                        <label htmlFor="validationDefault02">Account #</label>
                        <input type="text" name="txtaccount_no" value={this.state.acc_no} onChange={this.handleChange} className="form-control form-control-sm" />
                    </div>
                  </div>


                  {/*<!-- Forth Row -->*/}
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Government</label>
                    <select id="inputState" name="cmbgovt" value={this.state.govt} onChange={this.handleChange} className="form-control form-control-sm">
                      <option>NO</option>
                      <option>YES</option>                      
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault03">Present Status</label>                    
                    <select id="inputState" name="cmbpresent" value={this.state.present} onChange={this.handleChange} className="form-control form-control-sm">
                      <option>WORKING</option>
                      <option>COMPLETE</option>
                      <option>LEFT</option>
                      <option>RESIGN</option>
                    </select>                  
                  </div>


                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault04">Religion:</label>
                    <select id="inputState" name="cmbreligion" value={this.state.religion} onChange={this.handleChange} className="form-control form-control-sm">
                      <option>MUSLIM</option>
                      <option>NON MUSLIM</option>                      
                    </select>
                  </div>

                  <div className="col-md-3 mb-3">
                    <label htmlFor="validationDefault05">Remarks</label>
                    <input type="text" name="txtremarks" value={this.state.remarks} onChange={this.handleChange} className="form-control form-control-sm" />
                  </div>

                </div>

                {/*<!-- Forth Row -->*/}
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

                <button id="btnSubmit" className="btn btn-primary btn-sm" type="submit">Update Data</button>&nbsp;
                <button type="reset" className="btn btn-danger btn-sm">Clear Form</button>

                </div>
              </div>
             
                  
                
            </form>
            <br /><br />
          </div> 
          <Footer />         
          </div>

          
        )
    }
}

export default AddStudent;