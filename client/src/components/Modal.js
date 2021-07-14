import React, { Component } from 'react';

class Modal extends Component {
    constructor(props){
        super();
    }
  
    render() {
        return (            
            <div className="modal fade" id={"exampleModal" + this.props.pgname} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-primary" id="exampleModalLabel">DR. {this.props.pgname}</h5>                    
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">

                    <div className="card">                        
                        <div className="card-body">
                            <h5 className="card-title">Father: {this.props.fname}</h5>
                            <p className="card-text">
                                <span className="text-danger">ADDRESS:</span> 
                                <span className="text-secondary"> {this.props.address === '' ? 'No Address' : this.props.address}, </span> 
                                <br/>
                                <span className="text-danger">MOBILE:</span> {this.props.mobile}, 
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <span className="text-danger">EMAIL:</span> {this.props.email === '' ? 'No any email': this.props.email},
                                <br/>
                                <span className="text-danger">GENDER:</span> {this.props.gender === '' ? 'No Gender' : this.props.gender}, 
                            </p>
                        </div>
                        
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="text-success">Domicile:</span> {this.props.domicile === '' ? 'No Domicile' : this.props.domicile}, 
                                &nbsp; &nbsp; &nbsp;
                                <span className="text-success">Account No:</span> {this.props.account_no === '' ? 'No any Account': this.props.account_no}, 
                                &nbsp; &nbsp; &nbsp;
                                <span className="text-success">CNIC:</span> {this.props.cnic === '' ? 'No CNIC' : this.props.cnic }
                            </li>
                            
                            <li className="list-group-item">
                                <span className="text-success">DOB:</span> {this.props.do_birth === '' || null ? 'No Date of Birth' : this.props.do_birth}, 
                                <span className="text-success">CMS ID:</span> {this.props.cmsid === '' ? 'No CMSID' : this.props.cmsid}, 
                                <span className="text-success">Nationality:</span> {this.props.nationality === '' ? 'No Nationality' : this.props.nationality} 
                            </li>                            
                            
                            <li className="list-group-item">
                                <span className="text-success">PMDC:</span> {this.props.pmdc_no === '' ? 'No PMDC' : this.props.pmdc_no}, 
                                <span className="text-success">RTMC:</span> {this.props.rtmc_no === '' ? 'No RTMC' : this.props.rtmc_no},
                                
                            </li>                            

                            <li className="list-group-item"> 
                                <span className="text-success">Govt:</span> {this.props.govt}, 
                                <span className="text-primary">Present:</span> {this.props.ispresent} 
                            </li>                            
                            <li className="list-group-item"><span className="text-success">Remarks:</span> {this.props.remarks}</li>
                            <li className="list-group-item"> </li>
                        </ul>                        
                    </div>

                    
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Close Detail</button>
                </div>
                </div>
            </div>
            </div>
        )
    }
}
export default Modal;

