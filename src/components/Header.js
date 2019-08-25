import React, { Component } from 'react'

const MENU_TITLE_HOME = "home";
const MENU_TITLE_BIO = "bio";
const MENU_TITLE_BLOG = "blog";
const MENU_TITLE_CONTACT = "contact";

class Header extends Component {

    constructor(props) {
        super(props);
          
        console.log(`Header constructed`);

        // state keeps data that can be manipulated and changed
        this.state = {
            menuButtons: [{
                title: MENU_TITLE_HOME,
                name: 'Main',
                href: '/gallery',
                active: ''
            }, {
                title: MENU_TITLE_BIO,
                name: 'Bio',
                href: '/bio',
                active: ''
            }, {
                title: MENU_TITLE_BLOG,
                name: 'Blog',
                href: '/blog',
                active: ''
            }, {
                title: MENU_TITLE_CONTACT,
                name: 'Contact',
                href: '/contact',
                active: ''
            }]
        }
        const { activeMenu } = this.props;
     }
    


    render() {
        const { activeMenu } = this.props;
        const { menuButtons } = this.state;

        for (let i = 0; i < menuButtons.length; i++) {
            let obj = menuButtons[i];
            if (obj && (activeMenu == obj.name )) { obj.active = 'active'; }
        }

        return (
            <header id="header" className="header-bar d-flex d-lg-block align-items-center" data-aos="fade-left">
                <div className="site-logo">
                <a href="/gallery">RedMacDev1988</a>
                </div>
                
                <div className="d-inline-block d-xl-none ml-md-0 ml-auto py-3" 
                    style={{position: 'relative', top: '3'}}>
                    <a href="#" className="site-menu-toggle js-menu-toggle text-white">
                        <span className="icon-menu h3"></span>
                    </a>
                </div>
                
                <div className="main-menu">
                    <ul className="js-clone-nav">
                        {this.state.menuButtons.map(button => (
                            <li className = {button.active}>
                                <a href={button.href}>{button.title}</a>
                            </li>
                        ))} 
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
