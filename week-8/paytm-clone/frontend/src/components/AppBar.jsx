import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Button from "./Button";

const AppBar = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="shadow h-14 p-4 flex justify-between items-center">
      <h1 className="font-semibold text-2xl">PayTM App</h1>
      <div className="flex items-center gap-x-2">
        <p className="text-sm">
          Hello, <span className="font-semibold">{name}</span>
        </p>
        <Avatar letter={name[0]} colour={"slate-600"} text={"black"} />
        <Button
          label={"Sign Out"}
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        />
      </div>
    </div>
  );
};

export default AppBar;
