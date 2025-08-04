import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8080/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const loggedInUser = response.data.user;
          !loggedInUser ? navigate("/signin") : setUser(loggedInUser);
        });
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <AppBar name={(user ? user.firstName : "")} />
      <div className="m-8">
        <Balance />
        <Users loggedInUser={user} />
      </div>
    </div>
  );
};

export default Dashboard;
