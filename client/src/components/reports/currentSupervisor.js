import dateFormat from 'dateformat';
import React, { Component } from 'react';
import {ip} from '../ipaddress';
import axios from 'axios';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

class CurrentSupervisor extends Component {
    constructor() {
        super();
        console.log('constructor');

        this.state = {
            studentData : []
        }
    }

    componentDidMount() {
        axios.get('http://' + ip.address + ':3001/current_supervisors')
        .then((response) => {       
            this.setState({studentData: response.data}, () => console.log('data', response.data));
            //console.log('sudent data:', response.data);
        })
        .catch((error) => {
            console.log('Error occured from componentDidMount:' + error);
        })
        .then(() => {
            // always executed
            //----------- Generate PDF -------------
        const doc = new jsPDF({
            orientation: 'portrait'
        });
        var totalPagesExp = "{total_pages_count_string}";
        //doc.text(14,10, '');
    
        doc.autoTable({html: '#my-table', styles: {fontSize: 8}, margin: {top: 22, left:10, right: 10},
          didDrawPage: function (data) {
            // Header
            doc.setFontSize(20);
            doc.setTextColor(40);
            doc.setFontStyle('normal');
            doc.text(10,10, 'Dow University of Health Sciences');
            doc.text(10,18, 'Current Supervisor List');
    
            doc.setFontSize(9);
            let dt = new Date();
            doc.text(177,18, 'Print: ' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear());
    
            // Footer
            var str = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontSize(10);
            var pageSize = doc.internal.pageSize;
            var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(str, data.settings.margin.left, pageHeight - 10);
    
          }
        });
    
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
        doc.save('current_supervisor.pdf');

        // ----------------- End PDF -------------------

        });       
    }

  
  
    render() {
        return(
          <div className="text-center">
            
            <table id="my-table">
                <thead>          
                <tr>
                    <th scope="col">S#</th>
                    <th scope="col">DEPARTMENT</th>
                    <th scope="col">SUPERVISOR NAME</th>
                    <th scope="col">MOBILE</th>
                    <th scope="col">EMAIL</th>
                </tr>
                </thead>
            <tbody>
                { this.state.studentData && this.state.studentData.map((user, i) => {                      
                    return(                        
                        <tr key={i}>
                            <td>{i = i + 1}</td>                        
                            <td>{user.depart_id.ward_name}</td>
                            <td>{user.super_name}</td>
                            <td>{user.mobile}</td>                                                             
                            <td>{user.email}</td>                        
                        </tr>
                    )                        
                })}
            </tbody>
        </table>

          </div>
        )
    }
}

export default CurrentSupervisor;