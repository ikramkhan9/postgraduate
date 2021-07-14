import React, { Component } from 'react';

class Sidebar extends Component {

  operate(){
    console.log('About Page');
  }
    render() {

        
      let sidebar = {
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100, 
        padding: 0,
        boxShadow: 'inset -1 0 0 rgba(0, 0, 0, .1)'
      }
      
      let sidebarSticky = {
        position: '-webkit-sticky',
        position: 'sticky',
        top: 48, 
        height: 'calc(100vh - 48px)',
        paddingTop: '.5rem',
        overflowX: 'hidden',
        overflowY: 'auto'
      }
      
      
      let sidebarNavLink = {
        fontWeight: 500,
        color: '#333',
      }
      
      /*
      .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #999;
      }
      
      .sidebar .nav-link.active {
        color: #007bff;
      }
      
      .sidebar .nav-link:hover .feather,
      .sidebar .nav-link.active .feather {
        color: inherit;
      }
      */
      let sidebarHeading = {
        fontSize: '.75rem',
        textTransform: 'uppercase',
      }

        return (
          <div>
            <nav className="col-md-2 bg-dark">
    <div style={this.sidebarSticky}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a style={sidebarNavLink} className="nav-link active" href="/mbbsstudent">
            <span data-feather="home"></span>
            All MBBS Student <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/addmbbs">
            <span data-feather="file"></span>
            Add New MBBS Student
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="shopping-cart"></span>            
            MBBS Attendance
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="users"></span>
            MBBS Result
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="bar-chart-2"></span>
            Upload Image
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="layers"></span>
            Integrations
          </a>
        </li>
      </ul>

      <h6 style={sidebarHeading} className="d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Reports</span>
        <a className="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul className="nav flex-column mb-2">
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="file-text"></span>
            Current Student
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="file-text"></span>
            Yearwise Report
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="file-text"></span>
            Social engagement
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            <span data-feather="file-text"></span>
            Year-end sale
          </a>
        </li>
      </ul>
    </div>
  </nav>
          </div>
        )
    }
}

export default Sidebar;

