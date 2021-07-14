import dateFormat from 'dateformat';
import React, { Component } from 'react';
import {ip} from '../ipaddress';
import axios from 'axios';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

class SupervisorWiseTotal extends Component {
    constructor() {
        super();
        console.log('constructor');

        this.state = {
            studentData : []
        }
    }

    componentDidMount() {
        axios.get('http://' + ip.address + ':3001/supervisor_wise_total')
        .then((response) => {       
            this.setState({studentData: response.data});
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
            doc.text(10,18, 'Current Supervisor Wise Total');
    
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
        doc.save('supervisor_wise_total.pdf');

        // ----------------- End PDF -------------------

        });       
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

        var counts = {};
        
        return(
          <div className="text-center">
            
            <table id="my-table">
                <thead>          
                <tr>
                    <th scope="col">S#</th>
                    <th scope="col">DEPARTMENT</th>
                    <th scope="col">SUPERVISOR NAME</th>
                    <th scope="col">TOTAL TRAINEES</th>   
                    <th scope="col">TOTAL PGS</th>   
                </tr>
                </thead>
            <tbody>
                {
                    // this.state.studentData && this.state.studentData.map((myuser, n) => {
                    //     return(allward.push(myuser.supervisor_id.super_name));
                    // }
                    //console.log('allward', allward);

                    //allward = this.state.studentData.supervisor_id.super_name;
                    //console.log('allward', allward);

                    // TESTED CODE
                    // uniqueCount = ["a","b","c","d","d","e","a","b","c","f","g","h","h","h","e","a"];
                    // var  count = {};
                    // uniqueCount.forEach(function(i) { count[i] = (count[i]||0) + 1;});
                    // console.log(count);

                    this.state.studentData && this.state.studentData.map((user, i) => {
                    ispresent = newval.indexOf(user.supervisor_id.super_name);

                    if(ispresent == -1){
                        newval.push(user.supervisor_id.super_name);
                        total_pgs = 1;

                        return(                        
                            <tr key={i}>
                            {console.log('finaltotal', finalTotal)}
                                <td>{i = i + 1}</td>                        
                                <td>{user.depart_id.ward_name}</td>
                                <td>{user.supervisor_id.super_name}</td>
                                <td>{user.supervisor_id.super_name}</td>
                                <td>{finalTotal}</td>
                            </tr>
                        )                                                   
                    } else {
                        ++total_pgs;
                        finalTotal = total_pgs;
                        grandTotal = grandTotal + finalTotal;

                        //console.log('else', finalTotal);
                    }
                                           
                })}
                <tr>
                    <td>Total: {grandTotal}</td>
                </tr>
            </tbody>
        </table>

          </div>
        )
    }
}

export default SupervisorWiseTotal;