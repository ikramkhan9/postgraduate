import React, { Component } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import {Link} from 'react-router-dom';
let dateFormat = require('dateformat');


class EditFees extends Component {
  constructor(){
    super();

    this.state = {
      studentData: [],
      feeData: []
    }
    this.modalData = this.modalData.bind(this);
  }

  modalData(monof, amt){
    console.log('', amt);
    console.log('', monof);
  }

  componentDidMount(){
    axios.get('http://localhost:3001/editfee/' + this.props.match.params.sid)
      .then((response) => {
        this.setState({studentData: response.data});
        this.setState({feeData : this.state.studentData.fees});
        
        console.log('student fee data', this.state.studentData);
        console.log('Fee Data', this.state.feeData);

      /*
      this.setState({formValues: response.data});
      console.log('Student Data', this.state.formValues.sname);

      let ad_date = dateFormat(this.state.formValues.do_admission, "yyyy-mm-dd");
      console.log('dformate ', ad_date);

      let birth_date = dateFormat(this.state.formValues.do_birth, "yyyy-mm-dd");
      console.log('dformate birth', birth_date);
      
      this.setState({sname: this.state.formValues.sname,
          fname: this.state.formValues.fname,
          email: this.state.formValues.email,
          do_admission: ad_date,
          do_birth: birth_date,
          rollno: this.state.formValues.rollno,
          grno: this.state.formValues.grno,
          nationality: this.state.formValues.nationality,
          religion: this.state.formValues.religion,
          address: this.state.formValues.address,
          lastpassout: this.state.formValues.lastpassout,
          startclass: this.state.formValues.startclass,
          previous_school: this.state.formValues.previous_school,
          previous_school_address: this.state.formValues.previous_school_address,
          father_qualification: this.state.formValues.father_qualification,
          father_cnic: this.state.formValues.father_cnic,
          father_mobile: this.state.formValues.father_mobile,
          father_email: this.state.formValues.father_email,
          father_office: this.state.formValues.father_office,
          father_salary: this.state.formValues.father_salary
        })
        */
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
        return (
          <div> 
            <Navbar /> 
            <div className="container">
                <br />

                {/* Button trigger modal */}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                  Launch demo modal
                </button>

                {/* Modal */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Student Fee</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Month</label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Year</label>
                            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputAddress">Amount</label>
                          <input type="text" className="form-control" id="inputAddress" value="" placeholder="1234 Main St" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputAddress2">Paid Status</label>
                          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>                 
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>







                <h2>Edit Students Fees</h2>
                <div>Student Id: {this.props.match.params.sid} Fee Id: {this.props.match.params.feeid}</div>
                <br />
                <div id="myalert" className="alert alert-primary" role="alert">
                  All fee record paid and unpaid of that student.
                </div>
                <br />

                <div className="row">
                  <div className="col-sm-4">
                      <div className="card">
                        <img className="card-img-top" src="../../img_not_available.png" alt="img_not_available.png" />
                        <div className="card-body">
                          <h5 className="card-title">{this.state.studentData.sname}</h5>
                          <p className="card-text">Father: {this.state.studentData.fname} <br /> Address: {this.state.studentData.address}</p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">Email: {this.state.studentData.email}</li>
                          <li className="list-group-item">Birth Date: {this.state.studentData.do_birth}</li>
                          <li className="list-group-item">Mobile: {this.state.studentData.do_birth}</li>
                          <li className="list-group-item">Class: {this.state.studentData.class}</li>
                          <li className="list-group-item">Admission Date: {this.state.studentData.do_admission}</li>
                        </ul>
                        <div className="card-body">
                          <a href="/" className="card-link">Card link</a>
                          <a href="/" className="card-link">Another link</a>
                        </div>
                      </div>
                  </div> {/* End First Colum End */}

                  { /* Start Second Column */}
                  <div className="col-sm-8">
                    <table className="table table-sm">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">&nbsp; S#</th>
                          <th scope="col">Month Of</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Pay Date</th>
                          <th scope="col">Status</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        this.state.feeData.map((fes, i) => {
                            return (
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>{fes.monthof}</td>
                                <td>{fes.amount}</td>
                                <td>{dateFormat(fes.paydate, "yyyy-mmm-dd")}</td>
                                <td>{fes.status}</td>
                                <td><Link to={`/updatefee/${fes._id}`} onClick={this.modalData(fes.monthof, fes.amount)} data-toggle="modal" data-target="#exampleModal"><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>
                              </tr> 
                            )
                        })
                      }
                        
                        
                      </tbody>
                    </table>
                  </div> {/* End Second Column */}
                </div>
            </div>
          </div>
        )
    }
}

export default EditFees;