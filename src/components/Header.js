import React, { Component } from 'react'
 
class Header extends Component {
    render() {
        return (
            <header id="header" className="header-bar d-flex d-lg-block align-items-center" data-aos="fade-left">
                <div className="site-logo">
                <a href="/">RedMacDev1988</a>
                </div>
                
                <div className="d-inline-block d-xl-none ml-md-0 ml-auto py-3" 
                    style={{position: 'relative', top: '3'}}>
                    <a href="#" className="site-menu-toggle js-menu-toggle text-white">
                        <span className="icon-menu h3"></span>
                    </a>
                </div>
                
                <div className="main-menu">
                    <ul className="js-clone-nav">
                        <li className="active"><a href="/">Home</a></li>
                        <li><a href="bio.html">Bio</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                    <ul className="social js-clone-nav">
                        <li><a href="#"><span className="icon-facebook"></span></a></li>
                    </ul>
                </div>
            </header>  
        );
    }
}
 
export default Header;
