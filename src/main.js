import React, { Component } from 'react'
import { Footer, Header, Gallery } from './components';

class Main extends Component {
    constructor(props) {
      super(props);
    }
      render() {
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
              
              <Header activeMenu='Main' />
                <main className="main-content">
                  <div className="container-fluid photos">
                    <Gallery />
                    <Footer />
                  </div>
                </main>
              </div> 
          )
      }
  }

  export default Main;