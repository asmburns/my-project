import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../client/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const LogoutButton = ({ logout }) => {
  return (
    <a onClick={() => logout()}><FontAwesomeIcon icon={faSignOutAlt} size="lg"/></a>
  )
}

const { object, func } = PropTypes;

LogoutButton.propTypes = ({
  logout: func.isRequired
});

const mapDispatch = dispatch => ({
  logout: () => dispatch(logout())
}); 

export default connect(null, mapDispatch)(LogoutButton)