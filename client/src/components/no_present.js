import React, { Component } from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
import {ip} from './ipaddress';
import Modal from './Modal'; 

import '../index.css';
let dateFormat = require('dateformat');


class NoPresentStudent extends Component {

  constructor()
  {
    super();    
    this.state = { 
      studentDate: [],
      filter: "" 
    };    
    //this.state = { filteredDate: [] };
  }

  componentDidMount() {
    //this.props.history.push("/presentstudent");  
    fetch('http://' + ip.address + ':3001/nopresent')
      .then(res => res.json())
      .then(studentDate => this.setState({studentDate}));
      //.then(() => console.log(studentDate))
      //this.props.history.push("/presentstudent");  
      //console.log(studentDate); 
      //this.setState({ filtered : this.state.studentDate });
  };

  

  onChangeHandler = event => {    
    console.log(event.target.value);
    this.setState({ filter: event.target.value })
           
  }

    render() {
      const { filter, studentDate } = this.state;
      //console.log('studnt state', studentDate);

      const lowercasedFilter = filter.toLowerCase();
      //console.log('lowercasedFilter', lowercasedFilter);
      //console.log(studentDate)
      const filteredData = studentDate.filter(item => {
        if (
          (item['depart_id'] && item['depart_id'].ward_name && item['depart_id'].ward_name.toLowerCase().includes(lowercasedFilter)) ||
          (item['supervisor_id'] && item['supervisor_id'].ward_name && item['supervisor_id'].ward_name.toLowerCase().includes(lowercasedFilter)) ||
          (item['sname'] && item['sname'].toLowerCase().includes(lowercasedFilter)) ||
          (item['fname'] && item['fname'].toLowerCase().includes(lowercasedFilter)) ||
          (item['ispresent'] && item['ispresent'].toLowerCase().includes(lowercasedFilter))
        ) {
          return true;
        }
        // return Object.keys(item).some(key =>{
        //   console.log(item[key])
        //   return item[key].toLowerCase().includes(lowercasedFilter)
        // });
      });

        return (
            <div>
            <Navbar />

          <div className="bodygap">
          <br />
            <h4>Previous FCPS-II Trainees <small className="text-primary">Not present FCPS-II Trainees.</small></h4>

            <div>
              <input type="text" value={filter} className="form-control" onChange={this.onChangeHandler.bind(this)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search any" />
            </div>
            
            <br />
            <div class="alert alert-success" role="alert">
              All Complete or Left FCPS-II Trainees Record.
            </div>
            
          <table className="table table-sm table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">S#</th> 
                <th scope="col">Department</th> 
                <th scope="col">Supervisor</th>
                <th scope="col">Student Name</th> 
                <th scope="col">Father Name</th>
                <th scope="col">DOJ</th> 
                <th scope="col">DOR</th>     
                <th scope="col">STATUS</th>     

                {/* <th scope="col">Ed</th>  */}
                <th>Dt</th>    
              </tr>
            </thead>
            <tbody>
            {filteredData.map((user, i) => 
            
            <tr className="tablefontsize" key={user._id}>
              <td>{i+1}</td>
              <td>{user.depart_id.ward_name}</td>
              <td>{user.supervisor_id.super_name}</td>
              <td>{user.sname}</td>
              <td>{user.fname}</td>
              <td>{ user.doj == null ? 'No' : dateFormat(user.doj, 'yyyy-mm-dd')}</td>
              <td>{ user.dor == null ? 'No' : dateFormat(user.dor, "yyyy-mm-dd")}</td>
              <td>{user.ispresent}</td>
               
              {/* <td><Link to={`/editstudent/${user._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td> */}
              <td><a href="#" data-toggle="modal" data-target={"#exampleModal" + user.sname}><i className="fa fa-pencil" aria-hidden="true"></i></a>
                <Modal pgname={user.sname} fname={user.fname} address={user.address} email={user.email} mobile={user.mobile} 
                  domicile={user.domicile} account={user.account_no} cnic={user.cnic} do_birth={user.do_birth} cmsid={user.cmsid} 
                  nationality={user.nationality} pmdc_no={user.pmdc_no} rtmc_no={user.rtmc_no} gender={user.gender} govt={user.govt} ispresent={user.ispresent} dis_action={user.dis_action} med_board={user.med_board} remarks={user.remarks} />
              </td>
            </tr>
            
            )}    
          </tbody>
        </table>
        </div>
        </div>
        )
    }
}

export default NoPresentStudent;