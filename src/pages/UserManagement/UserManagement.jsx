import Navbar from "../../components/Navbar/Navbar";
import UserComponent from "../../components/UserComponent/UserComponent";
import "./UserManagement.css";
import UpdateUserProfile from "../../components/UpdateUserProfile/UpdateUserProfile";
import { useEffect, useState, useContext } from "react";
import AddUser from "../../components/AddUser/AddUser";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { DataContext } from "../../context/LoadUserManagementContext";

const UserManagement = () => {
  const navigate = useNavigate();
  const [isActivateUpdateTab, setIsActivateUpdateTab] = useState(false);
  const [updateTabCurrentData,setUpdateTabCurrentData] = useState('');
  const [isNewUserAddSectionOpen, setIsNewUserAddSectionOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userDataFiltered, setUserDataFiltered] = useState([]);
  const { data } = useContext(DataContext); // Accessing the context

  const ActionUpdateTab = (isActivate) => {
    setIsActivateUpdateTab(isActivate.action);
    setUpdateTabCurrentData(isActivate.currentUserData)
  };

  const verifyTheToken = async (token) => {
    const api = `${import.meta.env.VITE_SERVER_URL}/api/user/verify-token`;
    const response = await fetch(api, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  };

  useEffect(() => {
    const authenticateUser = async () => {
      const isTokenExist = localStorage.getItem("authToken");
      if (isTokenExist) {
        const api_response = await verifyTheToken(isTokenExist);
        if (!api_response) {
          toast.error("Session Expired, Login Again", {
            style: {
              color: "#d92525e1",
            },
          });
          navigate("/");
          return;
        }
        return;
      }
      toast.error("Login First", {
        style: {
          color: "#d92525e1",
        },
      });
      navigate("/auth");
    };
    authenticateUser();
  }, [navigate]);

  const handelUserSearch = (searchInputData) => {
    if (userData.length > 0) {
      const F_data = userData.filter(
        (user) =>
          user.first_name.toLowerCase().search(searchInputData.toLowerCase()) === 0
      );
      setUserDataFiltered(F_data);
    }
  };

  useEffect(() => {
    setUserDataFiltered(userData);
  }, [userData]);

  useEffect(() => {
    const handelToGetUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const api = `${import.meta.env.VITE_SERVER_URL}/api/user/all-user`;

      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return;
      }

      const JsonAllUserData = await response.json();

      setUserData(JsonAllUserData.allUserData);
    };

    handelToGetUserData();
  }, [data]);

  const handelToOpenNewUserSection = (isOpen) => {
    setIsNewUserAddSectionOpen(isOpen);
  };

  return (
    <div className="UserManagement_main">
      <Navbar
        inputSearchData={handelUserSearch}
        openAddNewUserSection={handelToOpenNewUserSection}
      />
      <div className="UserManagement_main_content_user">
        {userDataFiltered.length > 0
          ? userDataFiltered.map((ele) => (
              <UserComponent
                key={ele.id}
                userAvatar={ele.avatar}
                userName={`${ele.first_name} ${ele.last_name}`}
                userDateOfBirth={ele.date_of_birth}
                userPhoneNumber={ele.phone_number}
                bio={ele.bio}
                email={ele.email}
                activateUpdateTab={ActionUpdateTab}
              />
            ))
          : null}
      </div>
      {isActivateUpdateTab ? (
        <div className="UserManagement_main_update_comp">
          <UpdateUserProfile activateUpdateTab={ActionUpdateTab} activeUserCurrentData = {updateTabCurrentData}/>
        </div>
      ) : null}
      {isNewUserAddSectionOpen ? (
        <div className="UserManagement_main_update_comp">
          <AddUser openAddNewUserSection={handelToOpenNewUserSection} />
        </div>
      ) : null}
    </div>
  );
};

export default UserManagement;
