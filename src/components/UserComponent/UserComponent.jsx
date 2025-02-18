// import { useEffect } from "react";
import "./UserComponent.css";
import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/avtar_image_default.png'

const UserComponent = ({
  userAvatar,
  userName,
  userDateOfBirth,
  userPhoneNumber,
  bio,
  email,
  activateUpdateTab
}) => {

  const currentUserData = {
    userAvatar,
    userName,
    userDateOfBirth,
    userPhoneNumber,
    bio,
    email
  }

  const ActionToActivateUpdateTab = ()=>{
    activateUpdateTab({action:true,currentUserData})
  }
  return (
    <div className="user-card">
      <div className="profile-image">
        <img
          src={userAvatar==='null'?defaultAvatar:userAvatar}
          alt="Profile"
        />
        <span className="status-dot"></span>
      </div>
      <div className="user-info">
        <h2 className="user-name">{userName||'Lindsey James'}</h2>
        <p className="dateOfBirth">{userDateOfBirth||'17/07/2003'}</p>
        <p className="bio">
          {bio||'Lorem ipsum dolor sit form london...'}
        </p>
        <div className="tags">
          <span>{email||'vishalkumarnke93@gmail.com'}</span>
          <span>{userPhoneNumber||'vishalkumar@17'}</span>
        </div>
        <div className="action-buttons">
          {/* <button className="message-btn">View Card</button> */}
          <button className="follow-btn" onClick={()=>ActionToActivateUpdateTab()}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

UserComponent.propTypes = {
  userAvatar: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  userAge: PropTypes.number.isRequired,
  userPhoneNumber: PropTypes.string.isRequired,
  userDateOfBirth: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  activateUpdateTab: PropTypes.func.isRequired,
};

export default UserComponent;
