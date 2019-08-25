import React, { Component } from 'react'

class Bio extends Component {

  constructor(props) {
    super(props);
    console.log('- constructor -');
  }
    render() {
      console.log('- render -');
        return (
            <div className="site-wrap">

            <div className="site-mobile-menu">
              <div className="site-mobile-menu-header">
                <div className="site-mobile-menu-close mt-3">
                  <span className="icon-close2 js-menu-toggle"></span>
                </div>
              </div>
              <div className="site-mobile-menu-body"></div>
            </div>
          
          
            <main className="main-content">
              <div className="container-fluid photos">
               
               <h1>Testing 1 2 3</h1>
                
              </div>
            </main>
          </div> 
        )
    }
}

export default Bio;
