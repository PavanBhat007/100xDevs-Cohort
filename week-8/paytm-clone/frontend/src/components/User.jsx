import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const User = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-between py-1`}>
      <div className="flex items-center gap-x-2">
        <Avatar letter={user.firstName[0]} colour={"gray-200"} text={"black"} />
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </div>
      <button
        className="bg-gray-800 text-white py-2 px-6 rounded-lg cursor-pointer"
        onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }}
      >
        Send Money
      </button>
    </div>
  );
};

export default User;
