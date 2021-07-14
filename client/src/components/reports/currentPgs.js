import dateFormat from 'dateformat';
import React, { Component } from 'react';
import {ip} from '../ipaddress';
import axios from 'axios';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

class CurrentPGs extends Component {
    constructor() {
        super();

        this.state = {
            studentData : []
        }
    }

    componentDidMount() {
        axios.get('http://' + ip.address + ':3001/current_report')
        .then((response) => {       
            this.setState({studentData: response.data}, () => console.log(''));
            //console.log('sudent data:', response.data);
        })
        .catch((error) => {
            console.log('Error occured from componentDidMount:' + error);
        })
        .then(() => {
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
            doc.text(10,18, 'Current FCPS-II Trainees');
    
            doc.setFontSize(9);
            let dt = new Date();
            doc.text(260,18, 'Print: ' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear());
    
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
        doc.save('current_pgs.pdf');

        // ----------------- End PDF -------------------

        });       
    }

  
  
    render() {
        var newval = [];
        var ward = [];
        var ispresent = '';
        let ward_index = 0;
        let supervisorName = '';
        let  supervisorArray = [];
        let supervisorPresent = "";
        let total_trainee = 0;
        let final_trainees = 0;
        let superLen = 0;
        let ind = 0;
        let myObj = {};
        let fullData = [];

        let super_name = '';
        let countArray = [];
        let ispresent3 = '';
        let total_super = 1;
        let countSuper = [];
        let final_count = [];
        let final_result = [];
        let super_ind = 0;

        {this.state.studentData.map((student, ind) => {
            
            countArray.push(student.supervisor_id.super_name);            
            return (
              '<option key={headers}>{headers}</option>'
            );
          })
          //console.log('only super', countArray);

            //var arr = ['a','b','c','d','d','e','a','b','c','f','g','h','h','h','e','a'];
            final_count = countArray.reduce(function(prev, cur) {
            prev[cur] = (prev[cur] || 0) + 1;
            return prev;
            }, {});

            //console.log('json', final_count);

            //var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
            final_result = Object.keys(final_count).map(function(key) {
            //return [key, final_count[key]];
            return [final_count[key]];
            });

            console.log('result', final_result);
            console.log('one', final_result[0]);
        }

        return (
          <div className="text-center">
            
            <table id="my-table">
                <thead>          
                <tr>
                    <th scope="col">S#</th>
                    <th scope="col">DEPARTMENT</th>
                    <th scope="col">SUPERVISOR NAME</th>
                    <th scope="col">TRAINEE NAME</th>
                    <th scope="col">FATHER NAME</th>
                    <th>D.O.J</th>
                    <th>D.O.R</th>
                    <th scope="col">MOBILE</th>
                </tr>
                </thead>
            <tbody>
                { this.state.studentData && this.state.studentData.map((user, i) => {




                    ispresent = newval.indexOf(user.depart_id.ward_name);
                                            
                    if(ispresent == -1){
                        newval.push(user.depart_id.ward_name);
                        //console.log('new val', newval);
                        ind = newval.length;
                        //console.log('len', ind, newval[ind-1]);
                        //i = i - 1;
                    }

                    supervisorPresent = supervisorArray.indexOf(user.supervisor_id.super_name);

                    if(supervisorPresent == -1) {
                        supervisorArray.push(user.supervisor_id.super_name);
                        supervisorName = user.supervisor_id.super_name;
                        superLen = supervisorArray.length;                        

                        //console.log('wardname', newval[newval.length-1]);
                        //console.log('supername', supervisorArray[supervisorArray.length-1]);

                        // if(supervisorArray[supervisorArray.length-1]  == supervisorName) {
                        //     total_trainee = total_trainee + 1;
                        //     //console.log('total', total_trainee);
                        // } else {
                        //     total_trainee = 1
                        //     //console.log('not', total_trainee);
                        // }

                        fullData.push({'wardname' : newval[newval.length-1], 'supername' : supervisorArray[supervisorArray.length-1] });
                        //--i;



                        return(                            
                            
                            <tr key={i}>
                                <td colSpan="3">DEPARTMENT: {newval[newval.length-1]}</td>                        
                                <td colSpan="2">SUPERVISOR NAME: {supervisorArray[supervisorArray.length-1]}</td>
                                <td colSpan="2">TOTAL DEPART: { ind }</td>
                                <td colSpan="1">TOTAL PGS: { final_result[super_ind] }</td>
                                {super_ind = super_ind + 1}
                            </tr>                                
                        )
                    } else { 
                        return(                                                               
                            <tr key={i}>
                                <td>{i = i + 1}</td>                        
                                <td>{user.depart_id.ward_name}</td>
                                <td>{user.supervisor_id.super_name}</td>
                                <td>{user.sname}</td>
                                <td>{user.fname} </td>
                                <td>{dateFormat(user.doj, 'dd-mm-yyyy')}</td>
                                <td>{dateFormat(user.dor, 'dd-mm-yyyy')}</td>
                                <td>{user.mobile}</td>                        
                            </tr>
                        )
                    }
                    
                    

                        //myObj

                        


                    /*

                    supervisorPresent = supervisorArray.indexOf(user.supervisor_id.super_name);

                    if(supervisorPresent == -1) {
                        supervisorArray.push(user.supervisor_id.super_name)
                        superLen = supervisorArray.length;
                        console.log('superLen', superLen)
                        //console.log('supervisorArray', supervisorArray);
                        total_trainee = 1;
                    }
                    else {
                        total_trainee = total_trainee + 1;
                        final_trainees = total_trainee;
                        console.log('final_trainees', final_trainees);
                    }
                    
                    for(let j = 0; j < user.depart_id.ward_name.length; j++) {
                        ispresent = newval.indexOf(user.depart_id.ward_name);

                        //console.log('abc', user.depart_id.ward_name.length);
                        //console.log('-1 == not exist', ispresent);

                        if(ispresent == -1){
                            newval.push(user.depart_id.ward_name);
                            //console.log('new val', newval);

                            //--i;
                            //console.log('--i', --i);
                            
                            let ind = newval.length;
                            //console.log('len', ind, newval[ind-1]);

                            i = i - 1;
                            //console.log('i', i);

                            return(                                
                                <tr key={user._id} style={{backgroundColor: 'black !important'}}>
                                    <td colSpan="3"> DEPARTMENT: {newval[ind-1]}</td>                        
                                    <td colSpan="2">SUPERVISOR NAME: {user.supervisor_id.super_name} {supervisorArray[superLen-1]}</td>
                                    <td colSpan="2">TOTAL DEPART: { ind }</td>
                                    <td colSpan="1">TOTAL TRAINEES {final_trainees}</td>
                                </tr>                                
                                )
                            //++ward_index;    
                        }
                        //else {
                            return(                                                               
                                <tr key={i}>
                                    <td>{i = i + 1}</td>                        
                                    <td>{user.depart_id.ward_name}</td>
                                    <td>{user.supervisor_id.super_name}</td>
                                    <td>{user.sname}</td>
                                    <td>{user.fname} </td>
                                    <td>{dateFormat(user.doj, 'dd-mm-yyyy')}</td>
                                    <td>{dateFormat(user.dor, 'dd-mm-yyyy')}</td>
                                    <td>{user.mobile}</td>                        
                                </tr>
                            )                       
                    }
                    */
                    }
                )}
            </tbody>
        </table>
                    { /*console.log('fullData', fullData)*/ }
          </div>
        )
    }
}

export default CurrentPGs;