import React, { Component } from 'react'
import { Footer, Header } from './components';

class Bio extends Component {
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
              
              <Header activeMenu='Bio'/>
                <div className="main-content">
                  <div className="container-fluid photos"></div>
              <div className="mb-5">
                <img src="/images/me-grandma.jpg" className="img-fluid" style={{width:'50%', float:'left'}}/>
                <div style={{float: 'right', width: '50%', padding: '20px'}}>
                  <h2 className="text-white mb-3">Hey There! I'm RedMacDev1988</h2>
                  <div className="row" data-aos="fade-up">
                      <div className="col-md-12">
                        <p>
                          I'm an everything eating, deep sleeping, life loving bag of human flesh.
                          I can speak two different languages, and currently make my living developing software.
                        </p>
                        <p>I'm an avid runner, enthusiastic swimmer, and I try to act ten years my junior.</p>
                        <p>
                          The images and blogs on this site are the collection of my life experiences. 
                          They span multiple countries, across various continents, spread over many decades.
                        </p>
                        <p className="mb-5">
                          The contents of this site is also to keep and pass down wisdom to my children. 
                          It is written in memory of my grandmother.
                          I hope I give them the same love and care as she have given me.
                          I hope she would be proud of me. 
                        </p>
                        <p cass="mt-4">With love<br /> RedMacDev1988</p>
                    </div>
                  </div>
                </div>
              </div>
                    <Footer />
                  </div>
              </div> 
          )
      }
  }

  export default Bio;