
import React, { Component } from 'react'
 
class Footer extends Component {
    render() {
        return (
            <div id="footer" className="row justify-content-center"
            style={{ width: '100%', float: 'left' }}>
                <div className="col-md-12 text-center py-5">
                    <p>                
                    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a> 
                    </p>
                </div>
            </div>
        );
    }
}
 
export default Footer;

