import "./Home.css";
import logo from "../../assets/logo.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate  = useNavigate();

  return (
    <div className="home_main">
      <div className="home_main_arrange_width">
        <div className="home_main_navbar">
          <div className="home_main_navbar_left">
            <div className="home_main_navbar_left_logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="home_main_navbar_mid"></div>
          <div className="home_main_navbar_right">
            <div className="home_main_navbar_right_sync_btn">
              <button onClick={()=>navigate('/auth')}>
                <p>Login</p>
              </button>
            </div>
          </div>
        </div>
        <div className="home_main_section_1">
          <div className="home_main_section_1_wrap_tag_1">
            <div className="home_main_section_1_acknowledgement">
              <div className="home_main_section_1_acknowledgement_line">
                <p>✨ Manage Together, Succeed Together</p>
              </div>
            </div>
            <div className="home_main_section_1_tagline">
              <p id="home_main_section_1_tagline_1">A Management</p>
              <p id="home_main_section_1_tagline_2">Engine For Users</p>
            </div>
            <div className="home_main_section_1_about">
              <p>
                One platform for manage the user and his data.
              </p>
              <p>Transform your management way.</p>
            </div>
            <div className="home_main_section_1_sync_btn_2nd">
              <div className="home_main_section_1_sync_btn_2nd_div">
                <button onClick={()=>navigate('/auth')}>
                  <p>Let&apos;s Start</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="home_main_section_2"></div>
      </div>
      <div className="home_main_footers">
        <p>Build with ❤️ Vishal Kumar</p>
        
      </div>
    </div>
  );
};

export default Home;
