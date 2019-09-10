import React, { Component } from 'react'
import { Footer, Header } from './components';
import Validator from './FormValidator/validator';

class Contact extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email:'',
        message: '',
        errors: []
      };
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleMessageChange = this.handleMessageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handleMessageChange(event) {
      this.setState({message: event.target.value});
    }
    
    handleSubmit(event) {
      console.log('--clicked on form submit--');
      const { name, email, message } = this.state;

      var validator = new Validator();
      validator.decorate('hasName');
      validator.decorate('hasEmail');
      validator.decorate('hasMessage');
      validator.validate({
        name, 
        email,
        message
      });

      if (validator.errors.length > 0) {
        console.log(`there are errors`);
        console.log(validator.errors);

        this.setState({
          errors: validator.errors
        });
      } else {
        this.setState({
          errors: []
        });
        console.log(`everything is ok, send the email`);
      }
      //event.preventDefault();
    }

    
    render() {
      const { errors, name, email, message } = this.state;
      console.log(`errors updated. There are ${errors.length}`);
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
            
            <Header activeMenu='Contact'/>

            <div className="main-content">
              <div className="container-fluid photos">
                <div className="row justify-content-center">
                  <div className="col-md-6 pt-4"  data-aos="fade-up">
                    <h2 className="text-white mb-4">Contact Me</h2>
                    <div className="row">
                      <div className="col-md-12">
                        <p className="mb-5">You can contact me through this form</p>
                        <div className="row">
                          <div className="col-md-12">
                          
                            <div id='errors'>
                              <ul>
                              {errors.map((error, index) => {
                                return (<li>{error}</li>);
                              })}
                              </ul>
                            </div>

                            <form id="contactForm" action="/messages" method="POST">

                              <div className="row form-group">
                                <div className="col-md-6 mb-3 mb-md-0">
                                  <label className="text-white" for="name">Your Name</label>
                                  <input type="text" name="name" id="name" value={name} onChange={this.handleNameChange} className="form-control" />
                                </div>
                              </div>

                              <div className="row form-group">
                                <div className="col-md-12">
                                  <label className="text-white" for="email">Your Email</label> 
                                  <input type="email" id="email" name="email" value={email} onChange={this.handleEmailChange} className="form-control" />
                                </div>
                              </div>

                              <div className="row form-group mb-5">
                                <div className="col-md-12">
                                  <label className="text-white" for="message">Message</label> 
                                  <textarea name="message" id="message" 
                                            value={message} onChange={this.handleMessageChange} 
                                            cols="30" rows="7" className="form-control" 
                                            placeholder="Write your notes or questions here...">
                                  </textarea>
                                </div>
                              </div>

                              <div className="row form-group">
                                <div className="col-md-12">
                                  <input type="submit" value="Send Message" onClick={this.handleSubmit} className="btn btn-primary btn-md text-white" />
                                </div>
                              </div>

                            </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12 text-center py-5">
              <p>
            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
          </p>
            </div>
          </div>
        </div>
      </div>

      </div> 
      )
    }
  }

  export default Contact;