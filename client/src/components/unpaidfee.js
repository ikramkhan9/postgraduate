import React, { Component } from 'react';
import Navbar from './Navbar';
import {Link} from 'react-router-dom';
/*
searchingFor(term) => {
    return (x) => {
        return x.first.toLowerCase().includes(term.toLowerCase()) || !term;
    }
}
*/
class UnpaidFee extends Component {

    constructor(){
        super();

        this.state = {
            studentDate: [],
            search: ''
        }
        this.updateSearch = this.updateSearch.bind(this);
    }

  updateSearch(event){
      this.setState({search: event.target.value.substr(0, 20)});
    console.log(this.state.search);
  }

  
  componentDidMount(){
    //this.props.history.push("/presentstudent");  
    fetch('http://localhost:3001/mbbspresent')
      .then(res => res.json())
      .then(studentDate => this.setState({studentDate}));
      //this.props.history.push("/presentstudent");  
      //console.log(studentDate)   
  };

    render() {

        let filterdContact = this.state.studentDate.filter((contact) => {
                return contact.sname.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            });


        return (
          <div>
            <Navbar />  
            <div className="container">
            <br />
                <h2>Unpaid Student(s) Fee</h2>
                <form>
                    <input type="text" className="form-control" value={this.state.search} onChange={this.updateSearch} placeholder="Search student name" />
                </form>
                <br />
                <table className="table table-sm">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">S#</th>
                        <th scope="col">Class</th>
                        <th>GR #</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Father Name</th>                        
                        <th scope="col">Month Of</th>
                        <th scope="col">Amount</th>
                        <th>Status</th>
                        
                        <th scope="col">Edit</th>                
                    </tr>
                    </thead>
                    <tbody>
                    {filterdContact.map((user, i) => 
                    <tr key={user._id}>
                    <td>{i+1}</td>
                    <td>{user.class.classname}</td>
                    <td>{user.grno}</td>
                    <td>{user.sname}</td>
                    <td>{user.fname}</td>
                    <td>{user.fees[0].monthof}</td>
                    <td>{user.fees[0].amount}</td>
                    <td>{user.fees[0].status}</td>
                    
                    <td><Link to={`/editfee/${user._id}/${user.fees[0]._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>              
                    </tr>
                    )}    
                    </tbody>
                </table>
            </div>
          </div>
        )
    }
}

export default UnpaidFee;