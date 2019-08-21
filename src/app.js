import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './store';

import { Provider } from 'react-redux';
import { Footer, Header, Gallery } from './components';

class App extends Component {

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
          
           <Header />
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

ReactDOM.render( 
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))