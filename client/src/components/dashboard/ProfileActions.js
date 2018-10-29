import React from "react";
import { Link } from "react-router-dom";
import Events from '../events-dashboard/Events';
import ProfileAvatar from '../profile/ProfileAvatar';

const ProfileActions = () => {
  return (
    <div>
<div className="row"> 
      <div className="col-md-6">
        
      <h4 className="thin-text text-center text-secondary">Your Profile.</h4>
      <br/>
      <div className="col-6 col-md-6 m-auto">
      <ProfileAvatar />
      </div>
      <br/>
      <div className="col-sm-12">
        <Link to="/edit-profile" className="btn btn-block btn-light">
            <i className="fas fa-user-circle  text-warning mr-1" /> 
            Edit Profile
        </Link>
        </div>
        <div className="col-sm-12">
        <Link to="/add-experience" className="btn btn-block btn-light">
        <i className="fas fa-briefcase text-warning mr-1" />
            Add Experience
        </Link>
       </div>
       <div className="col-sm-12">
        <Link to="/add-education" className="btn btn-block btn-light">
            <i className="fas fa-graduation-cap text-warning mr-1" /> 
            Add Education
        </Link> 
     </div>
     <div className="col-sm-12">
        <Link to="/add-interests" className="btn btn-block btn-light">
        <i className="far fa-star text-warning mr-1"></i>
            Add Interests
        </Link>
        </div>
        <div className="col-sm-12">
        <Link to="/add-group" className="btn btn-block btn-light">
          <i className="fas fa-users text-warning text-warning mr-1" />
            Add Group
        </Link>
        </div>
        </div> 
      
         <div className="events-dashboard">
        <div className="col-md-6">
        <Events />
        </div>
        </div>
        </div>
      </div>
   
  );
};

export default ProfileActions;
