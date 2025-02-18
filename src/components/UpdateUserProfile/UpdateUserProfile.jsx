import "./UpdateUserProfile.css";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { useState, useEffect, useContext } from "react";
import DefaultAvatar from "../../assets/avtar_image_default.png";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/LoadUserManagementContext";

const UpdateUserProfile = ({ activateUpdateTab, activeUserCurrentData }) => {
  const DeactivateTab = () => {
    activateUpdateTab(false);
  };
  const navigate = useNavigate();
  // manual signup
  const [useFirstNameUpdate, setUseFirstNameUpdate] = useState("");
  const [userLastNameUpdate, setUserLastNameUpdate] = useState("");
  const [userInputBioAddUser, setUserInputBioAddUser] = useState("");
  const [userImageField, setUserImageField] = useState(null);
  const [userDateOfBirthUpdate, setUserDateOfBirthUpdate] = useState("");
  const [userPhoneNumberUpdate, setUserPhoneNumberUpdate] = useState("");
  const [userEmailCurrentActive, setUserEmailCurrentActive] = useState("");

  const [isUseFirstNameUpdateError, setIsUseFirstNameUpdateError] =
    useState(false);
  const [isUserLastNameUpdateError, setIsUserLastNameUpdateError] =
    useState(false);
  const [isUserBioUpdateError, setIsUserBioUpdateError] = useState(false);
  const [userDateOfBirthUpdateError, setUserDateOfBirthUpdateError] =
    useState(false);

  const [UseFirstNameUpdateErrorMsg, setUseFirstNameUpdateErrorMsg] =
    useState("invalid input");
  const [UserLastNameUpdateErrorMsg, setUserLastNameUpdateErrorMsg] =
    useState("invalid input");
  const [userInputBioAddUserErrorMsg, setUserInputBioAddUserErrorMsg] =
    useState("invalid input");
  const { data, updateData } = useContext(DataContext);

  useEffect(() => {
    // console.log(activeUserCurrentData)
    setUseFirstNameUpdate(activeUserCurrentData.userName.split(" ")[0]);
    setUserLastNameUpdate(activeUserCurrentData.userName.split(" ")[1]);
    setUserInputBioAddUser(activeUserCurrentData.bio);
    setUserImageField(activeUserCurrentData.userAvatar);
    setUserDateOfBirthUpdate(activeUserCurrentData.userDateOfBirth);
    setUserPhoneNumberUpdate(activeUserCurrentData.userPhoneNumber);
    setUserEmailCurrentActive(activeUserCurrentData.email);
  }, [
    activeUserCurrentData.bio,
    activeUserCurrentData.email,
    activeUserCurrentData.userAvatar,
    activeUserCurrentData.userDateOfBirth,
    activeUserCurrentData.userName,
    activeUserCurrentData.userPhoneNumber,
  ]);

  // Sign up with manual logic

  const uploadImage = (e) => {
    const imageData = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageData);
    fileReader.onload = () => setUserImageField(fileReader.result);
  };

  useEffect(() => {
    if (useFirstNameUpdate) {
      if (useFirstNameUpdate.length <= 2 || useFirstNameUpdate.length >= 12) {
        setUseFirstNameUpdateErrorMsg(
          "character must be more than 4 and less than 12"
        );
        setIsUseFirstNameUpdateError(true);
      } else if (/[0-9]/.test(useFirstNameUpdate)) {
        setUseFirstNameUpdateErrorMsg("numbers are not allowed");
        setIsUseFirstNameUpdateError(true);
      } else if (/[@!#%&*()`\-=+{}]/.test(useFirstNameUpdate)) {
        setUseFirstNameUpdateErrorMsg(
          "spacial character {@!#%&*()`-=+} not allow"
        );
        setIsUseFirstNameUpdateError(true);
      } else {
        setIsUseFirstNameUpdateError(false);
      }
    } else {
      setIsUseFirstNameUpdateError(false);
    }
  }, [useFirstNameUpdate]);

  useEffect(() => {
    if (userLastNameUpdate) {
      if (userLastNameUpdate.length <= 1 || userLastNameUpdate.length >= 10) {
        setUserLastNameUpdateErrorMsg(
          "character must be more than 1 and less than 10"
        );
        setIsUserLastNameUpdateError(true);
      } else if (/[0-9]/.test(userLastNameUpdate)) {
        setUserLastNameUpdateErrorMsg("numbers are not allowed");
        setIsUserLastNameUpdateError(true);
      } else if (/[@!#%&*()`\-=+{}]/.test(userLastNameUpdate)) {
        setUserLastNameUpdateErrorMsg(
          "spacial character {@!#%&*()`-=+} not allow"
        );
        setIsUserLastNameUpdateError(true);
      } else {
        setIsUserLastNameUpdateError(false);
      }
    } else {
      setIsUserLastNameUpdateError(false);
    }
  }, [userLastNameUpdate]);

  const verifyUserInputForUpdate = () => {
    if (useFirstNameUpdate.length === 0 || isUseFirstNameUpdateError) {
      toast.error("Error in First Name", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUseFirstNameUpdateError(true);
      return false;
    } else if (userLastNameUpdate.length === 0 || isUserLastNameUpdateError) {
      toast.error("Error in Last Name", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserLastNameUpdateError(true);
      return false;
    } else if (userInputBioAddUser.length === 0) {
      toast.error("Error in password", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserBioUpdateError(true);
      setUserInputBioAddUserErrorMsg("Enter your bio");
      return false;
    } else if (userDateOfBirthUpdate.length === 0) {
      toast.error("Error in Date of birth", {
        style: {
          color: "#d92525e1",
        },
      });
      setUserDateOfBirthUpdateError(true);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (userDateOfBirthUpdate.length > 0) {
      setUserDateOfBirthUpdateError(false);
    }
  }, [userDateOfBirthUpdate.length]);

  useEffect(() => {
    if (userInputBioAddUser.length > 0) {
      setIsUserBioUpdateError(false);
    }
  }, [userInputBioAddUser.length]);

  const updateUserProfileWithApi = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth");
      return;
    }
    const api = "http://localhost:8080/api/user/update-user";
    const bodyData = {
      avatar: userImageField ,
      first_name: useFirstNameUpdate,
      last_name: userLastNameUpdate,
      bio: userInputBioAddUser,
      email: userEmailCurrentActive,
      date_of_birth: userDateOfBirthUpdate,
      phone_number: userPhoneNumberUpdate,
    };
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bodyData),
    });
    const jsonResponse = await response.json();
    return response.ok
      ? { response: true, jsonResponse }
      : { response: false, jsonResponse };
  };

  const handelToUpdateUser = async () => {
    if (!verifyUserInputForUpdate()) {
      return;
    }

    const { response, jsonResponse } = await updateUserProfileWithApi();
    if (response) {
      DeactivateTab();
      toast.success(`${jsonResponse.msg}`, {
        style: {
          color: "#19b030d0",
        },
      });
      updateData(!data)
    }

    if (!response) {
      toast.error(`${jsonResponse.msg}`, {
        style: {
          color: "#d92525e1",
        },
      });
      return;
    }
  };

  return (
    <div className="UpdateUserProfile_main">
      <div className="UpdateUserProfile_main_top">
        <p className="UpdateUserProfile_main_top_title">Update User Profile</p>
        <button id="d_btn" onClick={() => DeactivateTab()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#aa2222"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
      </div>
      <div className="UpdateUserProfile_main_bottom">
        <div className="UserAuth_main_update_section">
          <div className="UserAuth_main_update_section_user_profile_image">
            <div
              className="UserAuth_main_update_section_user_profile_image_main"
              onClick={() => document.getElementById("userImageInput").click()}
            >
              <img
                src={userImageField === "null" ? DefaultAvatar : userImageField}
                alt="User Avatar"
              />
              <input
                id="userImageInput"
                className="update_auth_input"
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e)}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="UserAuth_main_update_section_input_div">
            <input
              className="update_auth_input"
              type="text"
              placeholder="First Name"
              required
              id={
                isUseFirstNameUpdateError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUseFirstNameUpdate(e.target.value)}
              value={useFirstNameUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handelToUpdateUser();
                }
              }}
            />
            <p className="update_error_msg_show">
              {isUseFirstNameUpdateError
                ? `${UseFirstNameUpdateErrorMsg}`
                : null}
            </p>
          </div>
          <div className="UserAuth_main_update_section_input_div">
            <input
              className="update_auth_input"
              type="text"
              placeholder="Last Name"
              required
              id={
                isUserLastNameUpdateError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserLastNameUpdate(e.target.value)}
              value={userLastNameUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handelToUpdateUser();
                }
              }}
            />
            <p className="update_error_msg_show">
              {isUserLastNameUpdateError
                ? `${UserLastNameUpdateErrorMsg}`
                : null}
            </p>
          </div>
          <div className="UserAuth_main_update_section_input_div">
            <input
              className="update_auth_input"
              type="date"
              placeholder="date_of_birth"
              required
              id={
                userDateOfBirthUpdateError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserDateOfBirthUpdate(e.target.value)}
              value={userDateOfBirthUpdate}
            />
            <p className="update_error_msg_show"></p>
          </div>
          <div className="UserAuth_main_update_section_input_div">
            {/* <input
              className="update_auth_input"
              type="password"
              placeholder="Password"
              required
              id={
                isUserBioUpdateError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserInputBioAddUser(e.target.value)}
              value={userInputBioAddUser}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handelToUpdateUser();
                }
              }}
            /> */}
            <input
              className="update_auth_input"
              type="text"
              placeholder="Bio"
              required
              id={
                isUserBioUpdateError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserInputBioAddUser(e.target.value)}
              value={userInputBioAddUser}
            />
            <p className="update_error_msg_show">
              {isUserBioUpdateError ? `${userInputBioAddUserErrorMsg}` : null}
            </p>
          </div>
          <div className="UserAuth_main_update_section_input_div">
            <input
              className="update_auth_input"
              type="number"
              placeholder="Phone Number"
              required
              onChange={(e) => {
                setUserPhoneNumberUpdate(e.target.value);
              }}
              value={userPhoneNumberUpdate}
            />
            <p className="update_error_msg_show"></p>
          </div>

          <button
            type="submit"
            className="user_data_update_btn"
            onClick={() => handelToUpdateUser()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
UpdateUserProfile.propTypes = {
  activateUpdateTab: PropTypes.func.isRequired,
  activeUserCurrentData: PropTypes.object.isRequired,
};

export default UpdateUserProfile;
