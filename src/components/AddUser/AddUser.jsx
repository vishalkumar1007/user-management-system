import "./AddUser.css";
import { toast } from "sonner";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Avtar from "../../assets/avtar_image_default.png";
import { DataContext } from "../../context/LoadUserManagementContext";


const AddUser = ({ openAddNewUserSection }) => {
  const [useFirstNameAddUser, setUseFirstNameAddUser] = useState("");
  const [userLastNameAddUser, setUserLastNameAddUser] = useState("");
  const [userPasswordAddUser, setUserPasswordAddUser] = useState("");
  const [userInputEmailIdAddUser, setUserInputEmailIdAddUser] = useState("");
  const [userInputDateOfBirth, setUserInputDateOfBirth] = useState("");
  const [userInputBioAddUser, setUserInputBioAddUser] = useState("");
  const [userInputPhoneNumber, setUserInputPhoneNumber] = useState("");
  const [userImageField, setUserImageField] = useState("");

  const [isUseFirstNameAddUserError, setIsUseFirstNameAddUserError] =
    useState(false);
  const [isUserInputEmailIdAddUserError, setIsUserInputEmailIdAddUserError] =
    useState(false);
  const [isUserLastNameAddUserError, setIsUserLastNameAddUserError] =
    useState(false);
  const [isUserPasswordAddUserError, setIsUserPasswordAddUserError] =
    useState(false);
  const [isUserDateOfBirthAddUserError, setIsUserDateOfBirthAddUserError] =
    useState(false);
  const [isUserBioAddUserError, setIsUserBioAddUserError] = useState(false);
  const [isUserPhoneNumberAddUserError, setIsUserPhoneNumberAddUserError] =
    useState(false);
  const [userImageFieldError, setUserImageFieldError] =
    useState(false);

  const [UseFirstNameAddUserErrorMsg, setUseFirstNameAddUserErrorMsg] =
    useState("invalid input");
  const [UserLastNameAddUserErrorMsg, setUserLastNameAddUserErrorMsg] =
    useState("invalid input");
  const [UserPasswordAddUserErrorMsg, setUserPasswordAddUserErrorMsg] =
    useState("invalid input");
  const [UserInputEmailIdAddUserErrorMsg, setUserInputEmailIdAddUserErrorMsg] =
    useState("invalid input");

    const { data, updateData } = useContext(DataContext);
    const [loading , setLoading] = useState(false);
  // handel to add new user

  const handelToAddUserUser = async ()=>{
    setLoading(true)
    if(verifyUserInputForAddUser()){
      const {success,json_res} = await handelToAddUserWithApi();
      if(success===true){
        toast.success(`New User Create Successfully`, {
          style: {
            color: "#19b030d0",
          },
        });
        handelToCloseAddNewUserSection();
        updateData(!data)
        setLoading(false);
      }
      else if(success===false){
        // console.log((json_res.msg))
        toast.error(`${json_res.msg}`, {
          style: {
            color: "#d92525e1",
          },
        });
        setLoading(false);
      }
    }
    setLoading(false);
  }

  const handelToAddUserWithApi = async()=>{
    const api = `${import.meta.env.VITE_SERVER_URL}/api/user/sign-up`;
    const body = {
      avatar:`${userImageField}`,
      first_name:`${useFirstNameAddUser}`,
      last_name:`${userLastNameAddUser}`,
      bio:`${userInputBioAddUser}`,
      email:`${userInputEmailIdAddUser}`,
      date_of_birth:`${userInputDateOfBirth}`,
      password:`${userPasswordAddUser}`,
      phone_number:`${userInputPhoneNumber}`
    }
    const response = await fetch(api,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(body)
    });
    const json_res = await response.json();
    return response.ok ? {success:true, json_res} : {success:false, json_res};
  }

  const handelToCloseAddNewUserSection = () => {
    openAddNewUserSection(false);
  };

  const uploadImage = (e) => {
    const imageData = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageData);
    fileReader.onload = () => setUserImageField(fileReader.result);
  };

  useEffect(() => {
    if (useFirstNameAddUser) {
      if (useFirstNameAddUser.length <= 2 || useFirstNameAddUser.length >= 12) {
        setUseFirstNameAddUserErrorMsg(
          "character must be more than 4 and less than 12"
        );
        setIsUseFirstNameAddUserError(true);
      } else if (/[0-9]/.test(useFirstNameAddUser)) {
        setUseFirstNameAddUserErrorMsg("numbers are not allowed");
        setIsUseFirstNameAddUserError(true);
      } else if (/[@!#%&*()`\-=+{}]/.test(useFirstNameAddUser)) {
        setUseFirstNameAddUserErrorMsg(
          "spacial character {@!#%&*()`-=+} not allow"
        );
        setIsUseFirstNameAddUserError(true);
      } else {
        setIsUseFirstNameAddUserError(false);
      }
    } else {
      setIsUseFirstNameAddUserError(false);
    }
  }, [useFirstNameAddUser]);

  useEffect(() => {
    if (userLastNameAddUser) {
      if (userLastNameAddUser.length <= 1 || userLastNameAddUser.length >= 10) {
        setUserLastNameAddUserErrorMsg(
          "character must be more than 1 and less than 10"
        );
        setIsUserLastNameAddUserError(true);
      } else if (/[0-9]/.test(userLastNameAddUser)) {
        setUserLastNameAddUserErrorMsg("numbers are not allowed");
        setIsUserLastNameAddUserError(true);
      } else if (/[@!#%&*()`\-=+{}]/.test(userLastNameAddUser)) {
        setUserLastNameAddUserErrorMsg(
          "spacial character {@!#%&*()`-=+} not allow"
        );
        setIsUserLastNameAddUserError(true);
      } else {
        setIsUserLastNameAddUserError(false);
      }
    } else {
      setIsUserLastNameAddUserError(false);
    }
  }, [userLastNameAddUser]);

  useEffect(() => {
    if (userPasswordAddUser) {
      if (userPasswordAddUser.length < 4 || userPasswordAddUser.length > 20) {
        setUserPasswordAddUserErrorMsg(
          "Password character must be more than 4 and less then 20"
        );
        setIsUserPasswordAddUserError(true);
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userPasswordAddUser.includes(operator)
        )
      ) {
        setUserPasswordAddUserErrorMsg(
          "Not allow to use these character $ ! % ^ | ( )"
        );
        setIsUserPasswordAddUserError(true);
      } else if (!/\d/.test(userPasswordAddUser)) {
        setUserPasswordAddUserErrorMsg("Password must be contain number");
        setIsUserPasswordAddUserError(true);
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userPasswordAddUser.includes(operator)
        )
      ) {
        setUserPasswordAddUserErrorMsg(
          "Password must be contain special character"
        );
        setIsUserPasswordAddUserError(true);
      } else if (!/[A-Z]/.test(userPasswordAddUser)) {
        setUserPasswordAddUserErrorMsg(
          "Password must contain at least one capital letter"
        );
        setIsUserPasswordAddUserError(true);
      } else {
        setUserPasswordAddUserErrorMsg("Seems Like All Set For AddUser Password");
        setIsUserPasswordAddUserError(false);
      }
    } else if (userPasswordAddUser === "") {
      setUserPasswordAddUserErrorMsg("");
      setIsUserPasswordAddUserError(false);
    }
  }, [userPasswordAddUser]);

  const verifyUserInputForAddUser = () => {
    if(userImageField.length===0){
      toast.error("Please upload Profile", {
        style: {
          color: "#d92525e1",
        },
      });
      setUserImageFieldError(true);
      return false;
    }else if (useFirstNameAddUser.length === 0 || isUseFirstNameAddUserError) {
      toast.error("Error in First Name", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUseFirstNameAddUserError(true);
      return false;
    } else if (userLastNameAddUser.length === 0 || isUserLastNameAddUserError) {
      toast.error("Error in Last Name", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserLastNameAddUserError(true);
      return false;
    } else if (userInputBioAddUser.length === 0 || isUserBioAddUserError) {
      toast.error("Error in password", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserBioAddUserError(true);
      return false;
    } else if (
      userInputEmailIdAddUser.length === 0 ||
      isUserInputEmailIdAddUserError
    ) {
      toast.error("Error in email", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserInputEmailIdAddUserError(true);
      return false;
    } else if (userInputDateOfBirth.length === 0) {
      toast.error("Error in Date Of Birth", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserDateOfBirthAddUserError(true);
      return false;
    } else if (userPasswordAddUser.length === 0 || isUserPasswordAddUserError) {
      toast.error("Error in password", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserPasswordAddUserError(true);
      setUserPasswordAddUserErrorMsg("Required");
      return false;
    } else if (
      userInputPhoneNumber.length === 0 ||
      isUserPhoneNumberAddUserError
    ) {
      toast.error("Error in password", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserPhoneNumberAddUserError(true);
      return false;
    } else {
      return true;
    }
  };

  useEffect(()=>{
    if(userImageField.length>0){
      setUserImageFieldError(false);
    }
  },[userImageField.length])

  useEffect(() => {
    if (userInputDateOfBirth.length > 0) {
      setIsUserDateOfBirthAddUserError(false);
    }
  }, [userInputDateOfBirth.length]);

  useEffect(() => {
    if (userInputBioAddUser.length > 0) {
      setIsUserBioAddUserError(false);
    }
  }, [userInputBioAddUser.length]);

  useEffect(() => {
    if (userInputPhoneNumber.length === 10) {
      setIsUserPhoneNumberAddUserError(false);
    }
  }, [userInputPhoneNumber.length]);

  useEffect(() => {
    if (userInputEmailIdAddUser) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(userInputEmailIdAddUser)) {
        setUserInputEmailIdAddUserErrorMsg("invalid input email");
        setIsUserInputEmailIdAddUserError(true);
      } else {
        setIsUserInputEmailIdAddUserError(false);
      }
    } else {
      setIsUserInputEmailIdAddUserError(false);
    }
  }, [userInputEmailIdAddUser]);

  // const handelToAddUserUser = () => {
  //   if (verifyUserInputForAddUser()) {
  //     handelToCloseAddNewUserSection();
  //     toast.success("User AddUser successfully", {
  //       style: {
  //         color: "#19b030d0",
  //       },
  //     });
  //   }
  // };

  return (
    <div className="addUserProfile_main">
      <div className="addUserProfile_main_top">
        <p className="addUserProfile_main_top_title">Add New User</p>
        <button id="d_btn" onClick={() => handelToCloseAddNewUserSection()}>
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
      <div className="addUserProfile_main_bottom">
        <div className="UserAuth_main_add_section">
          <div className="UserAuth_main_add_section_user_profile_image">
            <div className="UserAuth_main_add_section_user_profile_image_preview">
              <div
                className="UserAuth_main_add_section_user_profile_image_main"
                onClick={() =>
                  document.getElementById("userImageInput").click()
                }
                id={
                  userImageFieldError
                    ? "forgot_password_email_verify_error"
                    : null
                }
              >
                <img src={userImageField || Avtar} alt="User Avatar" />
                <input
                  id="userImageInput"
                  className="userAuth_input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => uploadImage(e)}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="UserAuth_main_add_section_user_profile_image_input">
              <div className="UserAuth_main_add_section_input_div">
                <input
                  className="userAuth_input"
                  type="text"
                  placeholder="First Name"
                  required
                  id={
                    isUseFirstNameAddUserError
                      ? "forgot_password_email_verify_error"
                      : null
                  }
                  onChange={(e) => setUseFirstNameAddUser(e.target.value)}
                  value={useFirstNameAddUser}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handelToAddUserUser();
                    }
                  }}
                />
                <p className="add_error_msg_show">
                  {isUseFirstNameAddUserError
                    ? `${UseFirstNameAddUserErrorMsg}`
                    : null}
                </p>
              </div>
              <div className="UserAuth_main_add_section_input_div">
                <input
                  className="userAuth_input"
                  type="text"
                  placeholder="Last Name"
                  required
                  id={
                    isUserLastNameAddUserError
                      ? "forgot_password_email_verify_error"
                      : null
                  }
                  onChange={(e) => setUserLastNameAddUser(e.target.value)}
                  value={userLastNameAddUser}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handelToAddUserUser();
                    }
                  }}
                />
                <p className="add_error_msg_show">
                  {isUserLastNameAddUserError
                    ? `${UserLastNameAddUserErrorMsg}`
                    : null}
                </p>
              </div>
            </div>
          </div>
          <div className="UserAuth_main_add_section_input_div">
            <input
              className="userAuth_input"
              type="text"
              placeholder="Bio"
              required
              id={
                isUserBioAddUserError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserInputBioAddUser(e.target.value)}
              value={userInputBioAddUser}
            />
            <p className="signup_error_msg_show"></p>
          </div>
          <div className="UserAuth_main_add_section_input_div">
            <input
              className="userAuth_input"
              type="email"
              placeholder="Email Address"
              required
              id={
                isUserInputEmailIdAddUserError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserInputEmailIdAddUser(e.target.value)}
              value={userInputEmailIdAddUser}
            />
            <p className="signup_error_msg_show">
              {isUserInputEmailIdAddUserError
                ? `${UserInputEmailIdAddUserErrorMsg}`
                : null}
            </p>
          </div>
          <div className="UserAuth_main_add_section_input_div">
            <input
              className="userAuth_input"
              type="date"
              placeholder="date_of_birth"
              required
              id={
                isUserDateOfBirthAddUserError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserInputDateOfBirth(e.target.value)}
            />
            <p className="add_error_msg_show"></p>
          </div>

          <div className="UserAuth_main_add_section_input_div">
            <input
              className="userAuth_input"
              type="password"
              placeholder="Password"
              required
              id={
                isUserPasswordAddUserError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserPasswordAddUser(e.target.value)}
              value={userPasswordAddUser}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handelToAddUserUser();
                }
              }}
            />
            <p className="add_error_msg_show">
              {isUserPasswordAddUserError
                ? `${UserPasswordAddUserErrorMsg}`
                : null}
            </p>
          </div>
          <div className="UserAuth_main_add_section_input_div">
            <input
              className="userAuth_input"
              type="number"
              placeholder="Phone Number"
              required
              id={
                isUserPhoneNumberAddUserError
                  ? "forgot_password_email_verify_error"
                  : null
              }
              onChange={(e) => setUserInputPhoneNumber(e.target.value)}
              value={userInputPhoneNumber}
            />
            <p className="add_error_msg_show"></p>
          </div>

          <button
            type="submit"
            className="user_data_add_btn"
            onClick={() => handelToAddUserUser()}
          >
            {loading ? (
              <svg
                id="forgot_loading_svg_icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4" />
                <path d="m16.2 7.8 2.9-2.9" />
                <path d="M18 12h4" />
                <path d="m16.2 16.2 2.9 2.9" />
                <path d="M12 18v4" />
                <path d="m4.9 19.1 2.9-2.9" />
                <path d="M2 12h4" />
                <path d="m4.9 4.9 2.9 2.9" />
              </svg>
            ) : (
              "UPLOAD"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
AddUser.propTypes = {
  openAddNewUserSection: PropTypes.func.isRequired,
};

export default AddUser;
