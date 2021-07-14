import React from 'react';
//import Link from 'react-router-dom';

class Navbar extends React.Component{
    render(){
        return(
            <div>
                
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="/home">Dow University</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="/home"><i className="fa fa-home fa-fw" aria-hidden="true"></i> Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/presentstudent"><i className="fa fa-user" aria-hidden="true"></i> Current PGs</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/nopresent"><i className="fa fa-user" aria-hidden="true"></i> No Present</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/addmbbs"><i className="fa fa-user" aria-hidden="true"></i> Add Student</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/generatefee"><i className="fa fa-user" aria-hidden="true"></i> Department</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="/fcps_supervisor"><i className="fa fa-user" aria-hidden="true"></i> Supervisor</a>
      </li>

      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Reports
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="/current_pgs">Current PGS</a>
          <a className="dropdown-item" href="/current_supervisors">Current Supervisor</a>
          <a className="dropdown-item" href="/supervisor_wise_total">Supervisor Wise Total</a>
          <a className="dropdown-item" href="/yearwise_report">Year Wise Report</a>
        </div>
      </li>
    </ul>
  </div>
</nav>

          <span className="d-block p-2 bg-dark text-white .d-sm-block"></span>

            </div>
        );
    }
}

export default Navbar;