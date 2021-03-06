import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import MemberItem from './MemberItem';
import { Link } from 'react-router-dom';
import { getMembers } from '../../actions/memberActions';

class Members extends Component {
  componentDidMount() {
    this.props.getMembers();
  }

    render() {
      const { members, loading } = this.props.member;
      let memberItems;

      if (members === null || loading) {
        memberItems = 
        <div className="col-sm-12">
        <Spinner />
        </div>;
      } else {
        if (members.length > 0) {
           memberItems = members.map(member => (
           
            <div className="col-md-6">
             <MemberItem key={member._id} member={member} />
             </div>
            
           ));
        } else {
          memberItems = <h4>No members found...</h4>;
        }
       
      }

      return (
       <div className="members">
       <div className="row">
       <div className="col-md-10">
       <span className="page-name">Members</span>
      
      
      <Link to={`/add-member`}> <i className="fas fa-plus-circle add-circle"></i></Link>
      </div>
      </div>
      
        <div className="members-list">
       
          <div className="col-sm-12">
          <div className="row">
              {memberItems}
            </div>
            
            </div>
          </div>
       
         <div style={{ marginBottom: "50px" }} />
      </div>
       
      );
    }
  }
  
 
Members.propTypes = {
  getMembers: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  member: state.member
});

export default connect(mapStateToProps, { getMembers })(Members);

  