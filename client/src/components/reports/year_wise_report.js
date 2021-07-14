import dateFormat from 'dateformat';
import React, { Component } from 'react';
import {ip} from '../ipaddress';
import axios from 'axios';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
//const dateFormat = require('dateformat');

class YearWiseReport extends Component {
    constructor() {
        super();
        console.log('constructor');

        this.state = {
            studentData : []
        }
        this.getPDF = this.getPDF.bind(this);
    }

    getPDF() {
        axios.get('http://' + ip.address + ':3001/yearwise_report')
        .then((response) => {       
            this.setState({studentData: response.data}, () => {console.log('getting data')});
            //console.log('sudent data:', response.data);
        })
        .catch((error) => {
            console.log('Error occured from componentDidMount:' + error);
        })
        .then(() => {
            console.log(this.state.studentData[0].doj.slice[0,4]);
            // always executed
            //----------- Generate PDF -------------
        const doc = new jsPDF({
            orientation: 'landscape'
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
            doc.text(10,18, 'Year Wise Report');

            
    
            doc.setFontSize(9);
            let dt = new Date();
            doc.text(265,18, 'Print: ' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear());
    
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
        doc.save('year_wise_report.pdf');

        // ----------------- End PDF -------------------
        });     
    }

    componentDidMount() {
          
    }

  
  
    render() {
        var newval = [];
        var allward = [];
        var ispresent = '';
        //let ispresent2 = 0;

        let newObj = {};
        let total_pgs = 0;
        var counts = {};
        let finalTotal = 0;
        let newWard = [];
        let grandTotal = 0;

        var current = null;
        var cnt = 0;

        let total_complete = 0;
        
        return(
          <div className="text-center">
          <button type="button" onClick={() => { alert('comming soon!'); }} class="btn btn-primary btn-sm">Get Excel</button>
          &nbsp;
          <button type="button" onClick={this.getPDF} class="btn btn-primary bt-sm">Get PDF</button>
            
            <table id="my-table" style={{"display": "none"}}>
                <thead>          
                <tr>
                    <th scope="col">S#</th>
                    <th scope="col">DEPARTMENT</th>
                    <th scope="col">SUPERVISOR NAME</th>
                    <th scope="col">TRAINEE NAME</th>   
                    <th scope="col">FATHER NAME</th>   
                    <th scope="col">DOJ</th>
                    <th scope="col">DOR</th>
                    <td scope="col">STATUS</td>
                </tr>
                </thead>
            <tbody>
                {   this.state.studentData && this.state.studentData.map((user, i) => {

                    if(user.ispresent == 'COMPLETE') {
                        total_complete = total_complete + 1;
                    }
                        return(
                            <tr>
                                <td>{i = i + 1}</td>                        
                                <td>{user.depart_id.ward_name}</td>
                                <td>{user.supervisor_id.super_name}</td>
                                <td>{user.sname}</td>
                                <td>{user.fname}</td>
                                <td>{dateFormat(user.doj, 'yyyy-mm-dd')}</td>
                                <td>{dateFormat(user.dor, 'yyyy-mm-dd')}</td>
                                <td>{user.ispresent}</td>
                            </tr>                        
                        );                                           
                    })
                }
                <tr>
                    <td></td>
                    <td>TOTAL TRAINEES: {this.state.studentData.length}</td>
                    <td></td>
                    <td></td>
                    <td>COMPLETE: {total_complete}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>

          </div>
        )
    }
}

export default YearWiseReport;