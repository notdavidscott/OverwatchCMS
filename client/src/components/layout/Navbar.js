import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile, getProfileByHandle, getCurrentProfile } from '../../actions/profileActions';
import ProfileAvatar from '../profile/ProfileAvatar';
import { Collapse, Container, Navbar, NavbarToggler, Nav, NavItem, NavbarBrand} from "reactstrap";


class NavbarMain extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  closeNavbar() {
    if (this.state.collapsed !== true) {
      this.toggleNavbar();
    }
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    
  }
  
  
  render() {
    const {
      isAuthenticated,
      //user
    } = this.props.auth;
    
    const { profile } = this.props.profile;

    let profileLink = "";
    if(Object.keys(profile || {}).length > 0) {
      profileLink = (
        <li className="rounded-circle avatar-nav"
        style={{ width: '25px', marginTop: '7px' }}
        >
          <Link className="nav-avatar" to={`/profile/${profile.handle}`}>
          <ProfileAvatar />
          </Link>
          
        </li>)
     }

    const authLinks = (
      
      <Nav className="ml-auto" navbar>
        <NavItem onClick={this.closeNavbar} className="nav-item">
          <Link className="nav-link" to="/">
            Dashboard
          </Link>
       </NavItem>
       <NavItem onClick={this.closeNavbar} className="nav-item">
       <Link className="nav-link" to="/people">
            People
          </Link>
      </NavItem>
       <NavItem onClick={this.closeNavbar} className="nav-item">
       <Link className="nav-link" to="/groups">
            Groups
          </Link>
      </NavItem>
      

         {/* <NavItem onClick={this.closeNavbar} className="nav-item">
         <Link className="nav-link" to="/events">
           Events
          </Link>
        </NavItem> */}

       {/* <NavItem onClick={this.closeNavbar} className="nav-item">
        {profileLink}
      </NavItem> */}
        <li className="nav-item">
            <a
            href="/"
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
        
          <i className="fas fa-sign-out-alt"></i>
            {'  '}
            Logout
          </a>
        
        </li>
   </Nav>
    );
    
    const friendLink = (
     
      <Nav navbar>
         <NavItem onClick={this.closeNavbar} className="nav-item">
          <Link className="nav-link" to="/profiles">
          
            {' '}
            Team
          </Link>
          
        </NavItem>
    </Nav>

    );
 

    const guestLinks = (
      <Nav className="ml-auto" navbar>
         <NavItem onClick={this.closeNavbar} className="nav-item">
          {/* <Link className="nav-link" to="/register">
            Register
          </Link> */}
          <Link className="nav-link" to="/about">
            About
          </Link> 
        </NavItem>

        <NavItem onClick={this.closeNavbar} className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </NavItem>
   </Nav>
    );

    return (
      //this starts the whole navbar
      <Navbar className="navigation_navbar navbar-color sticky-top navbar-expand-sm navbar-dark">
        <Container>
        <NavbarBrand onClick={this.closeNavbar} className="mr-auto"><Link className="navbar-brand" to="/">OVERWATCH</Link></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
          
        
                {isAuthenticated ? friendLink : null}
                
                {isAuthenticated ? authLinks : guestLinks}
       
          
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

NavbarMain.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle, getCurrentProfile, logoutUser, clearCurrentProfile })(
  NavbarMain
);
