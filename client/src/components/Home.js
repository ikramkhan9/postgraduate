import React from 'react';
import Navbar from './Navbar';

class Home extends React.Component{
    constructor(){
        super();

        this.allStudent = this.allStudent.bind(this);

    }

    allStudent(){
        console.log('Total Students');
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <br />
                    <h3>Control Panal</h3>
                    <br />

                    <div className="row">
                        <div className="col-sm">
                            <div className="card text-white bg-primary mb-3" onClick={this.allStudent} style={{}}>
                                <div className="card-body text-center">
                                    <h1 style={{fontSize: "50px"}} className="card-title"><i className="fa fa-user" aria-hidden="true"></i></h1>
                                    <p className="card-text">Number of Students</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                            <div className="card text-white bg-danger mb-3" style={{}}>
                                <div className="card-body">
                                    <h5 className="card-title">Primary card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm">
                            <div className="card text-white bg-success mb-3" style={{}}>
                                <div className="card-body">
                                    <h5 className="card-title">Primary card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>
        );
    }
}

export default Home;