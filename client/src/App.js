import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

    this.state = {
      txtusername: '',
      txtpwd: ''
    }
    this.changeHandlerUser = this.changeHandlerUser.bind(this);
    this.changeHandlerPwd = this.changeHandlerPwd.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    
    //this.state = { users: [] }
    //this.handleSubmit = this.handleSubmit.bind(this);
  
  }  
  
  componentDidMount(){
    //fetch('http://localhost:3001/users')
    //.then(res => res.json())
    //.then(users => this.setState({users}));
  }

  /*
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('http://localhost:3001/users', {
      method: 'POST',
      body: data,
    });
  }
  */

  changeHandlerUser(e){
    this.setState({txtusername: e.target.value});
  }

  changeHandlerPwd(e){
    this.setState({txtpwd: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    //console.log('Form submitted');
    console.log(this.state.txtusername);
    console.log(this.state.txtpwd);

    this.props.history.push('/home');
  }

  render() {

    var style = {      
      paddingBottom: 40,
      backgroundColor: '#f5f5f5'
    };

    let formSignin = {      
      maxWidth: 330,
      padding: 15,
      margin: 'auto',
    };

    let pad = { marginBottom: '8px' };
    

    return (
      <div>
        {/*
        <ul>
          {this.state.users.map(user => 
            <li key={user.id}>{user.username}</li>
          )}
        </ul>
        */}
        <div style={style}>
          <h3>&nbsp; Dow University of Health Sciences</h3>
          <h6 className="">&nbsp; &nbsp; Baba-e-Urdu Road Karachi Pakistan</h6>
          <hr />
        </div>

        <div className="text-center" style={style}>
        <form style={formSignin} onSubmit={this.handleSubmit}>
      <img className="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
      <h1 className="h3 mb-3 font-weight-normal">Please Signin</h1>
      
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input type="email" id="inputEmail" style={pad} value={this.state.txtusername} onChange={this.changeHandlerUser} className="form-control" placeholder="Email address" required autoFocus />
      
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input type="password" style={pad} id="inputPassword" value={this.state.txtpwd} onChange={this.changeHandlerPwd} className="form-control" placeholder="Password" required />
      
      <button className="btn btn-primary btn-block" style={pad} type="submit">Sign in</button>
      <p className="mt-5 mb-3 text-muted">&copy; 2018-2019</p>
    </form>
    </div>

          {/*
        <form method="post" onSubmit={this.handleSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
          */}

      </div>
    );
  }
}

export default App;
