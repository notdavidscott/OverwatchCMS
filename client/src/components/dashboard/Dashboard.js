import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import Group from "./Group";


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <hr className="no-padding" />
            <p className="lead text-muted">
              Welcome,{" "}
              <Link to={`/profile/${profile.handle}`}>
                <span className="blue-text">{user.name}</span>
              </Link>
            </p>
           
              <br/>
            <ProfileActions />

            {/* <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <Group group={profile.group} /> */}
          
            <div style={{ marginBottom: "60px" }} />
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div className="welcome-page">
            <p className="lead text-muted">Welcome, {user.name}</p>
            <p>Text to be added, regarding the intro</p>
           
            <br />
            <br />
            <p>You have not yet setup a profile, please add some info</p>

            <Link to="/create-profile" className="btn btn-warning">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <span className="page-name">Dashboard</span>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
