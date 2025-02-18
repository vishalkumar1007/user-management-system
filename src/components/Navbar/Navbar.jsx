import "./Navbar.css";
import logo from "../../assets/logo.webp";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const Navbar = ({inputSearchData,openAddNewUserSection}) => {
  const navigate = useNavigate();
  const handelUserInputSearch = (e)=>{
    inputSearchData(e.target.value)
  }

  const handelToNewUserSectionOpen = ()=>{
    openAddNewUserSection(true)
  }

  const handelToLogOutUser = ()=>{
    localStorage.removeItem('authToken');
    navigate('/')
  }

  return (
    <div className="Navbar_main">
      <div className="Navbar_main_arrange_width">
        <div className="Navbar_main_home_main_navbar">
          <div className="Navbar_main_home_main_navbar_left">
            <div className="Navbar_main_home_main_navbar_left_logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="Navbar_main_home_main_navbar_mid"></div>
          <div className="Navbar_main_home_main_navbar_right">
            {/* <div className="Navbar_main_home_main_navbar_right_profile">
                V
            </div> */}
            <div id="Navbar_main_search_user_open">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5149e7"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>{" "}
              <input
                id="search_user_nav_input"
                type="text"
                placeholder="Search..."
                onChange={(e)=>handelUserInputSearch(e)}
              />
            </div>
            <button id="Navbar_main_add_user_btn" onClick={handelToNewUserSectionOpen}>Add User</button>
            <button id="Navbar_main_log_out_btn" onClick={()=>handelToLogOutUser()} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" ><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg></button>
          </div>
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  inputSearchData: PropTypes.func.isRequired,
  openAddNewUserSection: PropTypes.func.isRequired,
};

export default Navbar;
