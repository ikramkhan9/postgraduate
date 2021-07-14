import React, { Component } from 'react';

class About extends Component {

  operate(){
    console.log('About Page');
  }
    render() {
        return (
          <div className="text-center">
            <h2>This is about page</h2>
          </div>
        )
    }
}

export default About;