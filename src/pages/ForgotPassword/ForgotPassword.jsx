import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useNavigate , useLocation} from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isEmailVerifyError, setIsEmailVerifyError] = useState(false);
  const [forgotUiState, setForgotUiState] = useState("verifyOtp");
  const [openUpdateSection,setOpenUpdateSection] = useState(false) 
  //   password error msg
  const [isUpdatePasswordErrorInput1, setIsUpdatePasswordErrorInput1] =
    useState(false);
  const [isUpdatePasswordErrorInput2, setIsUpdatePasswordErrorInput2] =
    useState(false);
  const [updatePassErrorMsgInput1, setUpdatePassErrorMsgInput1] =
    useState("password not valid");
  const [updatePassErrorMsgInput2, setUpdatePassErrorMsgInput2] =
    useState("password not valid");

  const [userInputEmail, setUserInputEmail] = useState("");
  const [userInputNewPassword, setUserInputNewPassword] = useState("");
  const [userInputConformPassword, setUserInputConformPassword] = useState("");
  const [isLoadingSendEmail , setIsLoadingSendEmail] = useState(false);
  const [emailSendSuccessfullyToUser , setEmailSendSuccessfullyToUser] = useState(false);
  const [updateUserEmailFromToken , setUpdateUserEmailFromToken] = useState('');
  const location = useLocation();
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
    setEmailSendSuccessfullyToUser(false);
  },[userInputEmail])

  useEffect(()=>{
    const handelToVerifyUpdateUser = async ()=>{
      const queryParams = new URLSearchParams(location.search);
      const updateToken = queryParams.get('token');
      const updateStateOpen = queryParams.get('open');
      if(!updateToken || !updateStateOpen){
        return
      }

      if(updateToken){
        const api = `${import.meta.env.VITE_SERVER_URL}/api/user/verify-token`;
        const response = await fetch(api,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            authorization:`Bearer ${updateToken}`
          }
        });
        const jsonResponse = await response.json();

        if(response.ok && jsonResponse.status==='access granted'){
          setForgotUiState('updateUserPassword')
          setUpdateUserEmailFromToken(jsonResponse?.decoded.email)
          if(updateStateOpen==='true'){
            setOpenUpdateSection(true)
          }
        }
      }
    }
    handelToVerifyUpdateUser();
  },[location.search])


  useEffect(() => {
    if (userInputNewPassword) {
      if (userInputNewPassword.length < 4 || userInputNewPassword.length > 20) {
        setUpdatePassErrorMsgInput1(
          "Password character must be more than 4 and less then 20"
        );
        setIsUpdatePasswordErrorInput1(true);
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userInputNewPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput1(
          "Not allow to use these character $ ! % ^ | ( )"
        );
        setIsUpdatePasswordErrorInput1(true);
      } else if (!/\d/.test(userInputNewPassword)) {
        setUpdatePassErrorMsgInput1("Password must be contain number");
        setIsUpdatePasswordErrorInput1(true);
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userInputNewPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput1(
          "Password must be contain special character"
        );
        setIsUpdatePasswordErrorInput1(true);
      } else if (!/[A-Z]/.test(userInputNewPassword)) {
        setUpdatePassErrorMsgInput1(
          "Password must contain at least one capital letter"
        );
        setIsUpdatePasswordErrorInput1(true);
      } else {
        setUpdatePassErrorMsgInput1("Seems Like All Set For Update Password");
        setIsUpdatePasswordErrorInput1(false);
      }
    } else if (userInputNewPassword === "") {
      setUpdatePassErrorMsgInput1("");
      setIsUpdatePasswordErrorInput1(false);
    }
  }, [userInputNewPassword]);

  useEffect(() => {
    if (userInputConformPassword) {
      if (
        !(
          userInputConformPassword.length > 4 ||
          userInputConformPassword.length < 20
        )
      ) {
        setUpdatePassErrorMsgInput2(
          "Password character must be more than 4 and less then 20"
        );
        setIsUpdatePasswordErrorInput2(true);
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userInputConformPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput2(
          '"Not allow to use these character $ ! % ^ | ( ) '
        );
        setIsUpdatePasswordErrorInput2(true);
      } else if (!/\d/.test(userInputConformPassword)) {
        setUpdatePassErrorMsgInput2("Password must be contain number");
        setIsUpdatePasswordErrorInput2(true);
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userInputConformPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput2(
          "Password must be contain special character"
        );
        setIsUpdatePasswordErrorInput2(true);
      } else if (!/[A-Z]/.test(userInputConformPassword)) {
        setUpdatePassErrorMsgInput2(
          "Password must contain at least one capital letter"
        );
        setIsUpdatePasswordErrorInput2(true);
      } else if (userInputNewPassword !== userInputConformPassword) {
        setUpdatePassErrorMsgInput2("Password not same");
        setIsUpdatePasswordErrorInput2(true);
      } else {
        setUpdatePassErrorMsgInput2("Seems Like All Set For Update Password");
        setIsUpdatePasswordErrorInput2(false);
      }
    } else if (userInputConformPassword === "") {
      setUpdatePassErrorMsgInput2("");
      setIsUpdatePasswordErrorInput2(false);
    }
  }, [userInputConformPassword, userInputNewPassword]);

  useEffect(() => {
    // console.log(userInputEmail);
    if (userInputEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailVerifyError(!emailPattern.test(userInputEmail));
    } else {
      setIsEmailVerifyError(false);
    }
  }, [userInputEmail]);

  const handelToSendForgotLinkToUserEmail = async (email) => {
    setIsLoadingSendEmail(true);
    const api = `${import.meta.env.VITE_SERVER_URL}/api/user/forgot-password?email=${email}`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    setIsLoadingSendEmail(false);
    return response.ok
      ? { response: true, jsonResponse }
      : { response: false, jsonResponse };
  };
  
  const sendOtpToUserEmailId = async () => {
    if (userInputEmail.length === 0 || isEmailVerifyError) {
      toast.error("Input email not valid", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsEmailVerifyError(true);
      return;
    }

    const { response, jsonResponse } = await handelToSendForgotLinkToUserEmail(
      userInputEmail
    );

    if (response) {
      toast.success(`${jsonResponse.msg}`, {
        style: {
          color: "#19b030d0",
        },
      });
      setEmailSendSuccessfullyToUser(true);
    } else {
      toast.error(`${jsonResponse.msg}`, {
        style: {
          color: "#d92525e1",
        },
      });
    }
  };

  useEffect(()=>{
    setEmailSendSuccessfullyToUser(false);
  },[])

  const handelToUpdateUserPassword = async() => {
    setLoading(true);
    if (
      (userInputNewPassword.length > 0 ||
        userInputConformPassword.length > 0) &&
      isUpdatePasswordErrorInput1 === false &&
      isUpdatePasswordErrorInput2 === false &&
      userInputNewPassword !== userInputConformPassword
    ) {
      toast.error("please satisfied password condition ", {
        style: {
          color: "#d92525e1",
        },
      });
      if (userInputNewPassword.length === 0) {
        setIsUpdatePasswordErrorInput1(true);
        setUpdatePassErrorMsgInput1("please enter password");
      } else if (userInputConformPassword.length === 0) {
        setIsUpdatePasswordErrorInput2(true);
        setUpdatePassErrorMsgInput2("please enter conform password");
      }
    } else if (
      userInputNewPassword.length === 0 ||
      userInputConformPassword.length === 0
    ) {
      toast.error("Please enter new password", {
        style: {
          color: "#d92525e1",
        },
      });
    } else if (
      isUpdatePasswordErrorInput1 === true ||
      isUpdatePasswordErrorInput2 === true
    ) {
      toast.error("Invalid Password", {
        style: {
          color: "#d92525e1",
        },
      });
    } else {
      const updatePasswordStatus = await updateUserPasswordWithApi();

      if(updatePasswordStatus){
        toast.success(`${updatePasswordStatus.msg}`, {
          style: {
            color: "#19b030d0",
          },
        });
        setLoading(false);
        navigate('/auth')
      }else{
        toast.error(`${updatePasswordStatus.msg}`, {
          style: {
            color: "#d92525e1",
          },
        });
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const updateUserPasswordWithApi = async ()=>{
    const queryParams = new URLSearchParams(location.search);
    const updateToken = queryParams.get('token');
    const api = `${import.meta.env.VITE_SERVER_URL}/api/user/updatePassword`;
    const body = {
      email:updateUserEmailFromToken,
      password:userInputNewPassword
    }
    const response = await fetch(api,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        authorization:`Bearer ${updateToken}`
      },
      body:JSON.stringify(body)
    })
    const jsonResponse = await response.json();
    return response.ok?{response:true,msg:jsonResponse.msg}:{response:false,msg:jsonResponse.msg}
  }

  return (
    <div className="ForgotPassword_main">
      <div className="ForgotPassword_main_arrange_width">
        {(forgotUiState === "verifyOtp" && openUpdateSection===false)? (
            <div className="ForgotPassword_main_verify_email">
              <div className="ForgotPassword_main_verify_email_top">
                <input
                  id={
                    isEmailVerifyError
                      ? "forgot_password_email_verify_error"
                      : null
                  }
                  className="forgot_password_input"
                  type="email"
                  placeholder="Enter Your Email id"
                  value={userInputEmail}
                  onChange={(e) => setUserInputEmail(e.target.value)}
                  required
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendOtpToUserEmailId();
                    }
                  }}
                />
                <p className="ForgotPassword_main_email_verify_error">
                  {isEmailVerifyError ? "email is not valid" : null}
                </p>
              </div>
              <div className="ForgotPassword_main_verify_email_bottom">
                <button
                  type="submit"
                  className="forgot_pass_btn"
                  onClick={() => sendOtpToUserEmailId()}
                  disabled={isLoadingSendEmail}
                >
                  {
                    isLoadingSendEmail?
                    <svg id="forgot_loading_svg_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                    :
                    'Continue'
                  }
                </button>
              </div>
              <p id="goto_chose_section" className="goto_chose_section_msg" >
                <button
                  id="goto_chose_section_btn"
                  onClick={() => navigate("/auth")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m14 16-4-4 4-4" />
                  </svg>
                </button>
              </p>
              <div className="forgot_msg_show">
                {
                  emailSendSuccessfullyToUser?
                  <p>check your email, we send the update password link to your registered email address .  this is the only way to forgot your password</p>
                  :null
                }
              </div>
            </div>
        ) : (
          <>
            {/* update password  */}
            {
              <div className="ForgotPassword_main_update_password">
                <div className="ForgotPassword_main_update_password_top">
                  <input
                    id={
                      isUpdatePasswordErrorInput1
                        ? "forgot_password_email_verify_error"
                        : null
                    }
                    className="forgot_password_input"
                    type="password"
                    placeholder="New Password"
                    value={userInputNewPassword}
                    required
                    onChange={(e) => setUserInputNewPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handelToUpdateUserPassword();
                      }
                    }}
                  />
                  <p className="ForgotPassword_main_update_pass_error">
                    {isUpdatePasswordErrorInput1
                      ? `${updatePassErrorMsgInput1}`
                      : null}
                  </p>
                  <input
                    id={
                      isUpdatePasswordErrorInput2
                        ? "forgot_password_email_verify_error"
                        : null
                    }
                    className="forgot_password_input"
                    type="password"
                    placeholder="Conform Password"
                    value={userInputConformPassword}
                    onChange={(e) =>
                      setUserInputConformPassword(e.target.value)
                    }
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handelToUpdateUserPassword();
                      }
                    }}
                  />
                  <p className="ForgotPassword_main_update_pass_error">
                    {isUpdatePasswordErrorInput2
                      ? `${updatePassErrorMsgInput2}`
                      : null}
                  </p>
                </div>
                <div className="ForgotPassword_main_update_password_bottom">
                  {/* <button type="submit" className="forgot_pass_btn" onClick={()=>setForgotUiState('verifyOtp')}> */}
                  <button
                    type="submit"
                    className="forgot_pass_btn"
                    onClick={() => handelToUpdateUserPassword()}
                    disabled={loading}
                  >
                    {
                    loading?
                    <svg id="forgot_loading_svg_icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                    :
                    'Update Password'
                  }
                  </button>
                </div>
                <button
                  id="goto_chose_section_btn"
                  className="forgot_pass_go_back"
                  onClick={() => setForgotUiState("verifyOtp")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m14 16-4-4 4-4" />
                  </svg>
                </button>
                
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
