import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.data.user) navigate("/dashboard");
      });
  }, []);

  return (
    <div className="w-2/3 md:w-150 bg-slate-300 mx-auto mt-10 p-12 rounded-sm">
      <div className="bg-white p-3 rounded-md flex flex-col justify-center items-center">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to login to your account"} />
        <div className="my-4 flex flex-col justify-start items-start mb-3 w-full">
          <InputBox
            label={"Email"}
            placeholder={"john.doe@xyz.com"}
            type={"email"}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"password"}
            type={"password"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:8080/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );

              localStorage.setItem("token", response.data.token);
              navigate("/dashboard");
            }}
            label={"Sign In"}
          />
        </div>
        <BottomWarning
          label={"Don't have an account? "}
          route={"/signup"}
          routeText={"Sign Up"}
        />
      </div>
    </div>
  );
};

export default Signin;
