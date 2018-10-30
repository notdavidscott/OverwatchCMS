import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment, addLike, removeLike } from '../../actions/postActions';

import EditCommentForm from '../edit-comments/EditComments';



class CommentItem extends Component {
  
  state = {
    isEditting: false, 
}

  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  renderText = () => {
    const { comment, postId } = this.props;
    const { isEditting } = this.state;
    return isEditting ? <EditCommentForm comment={comment} postId={postId} /> : <p className="lead post-text">{comment.text}</p>;
  }

  onEditClick = () => {
    console.log("edit");
    this.setState({ isEditting: !this.state.isEditting });
  }

//work above here
  render() {
    const { comment, postId, commentId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>

          <div className="col-md-10">
            {this.renderText()}
            </div>
          <div className="col-md-10">
            {comment.user === auth.user.id ? (
              <Fragment>
              <button
                onClick={this.onDeleteClick.bind(this, postId, commentId)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
              <button 
                    onClick={ this.onEditClick }
                    type = "button"
                    className = "badge badge-light mr-1"
                  >
                    <span>Edit Comment</span>
                  </button>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  addLikeComment: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  EditComment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { 
  deleteComment, 
  addLike, 
  removeLike,
 })(CommentItem);

//  Add the Edit Logic like we did for a post
//  Import your edit comment form in here
//  <EditCommentForm comment={comment} postId={postId} />
