import { useEffect, useState } from "react";
import axios from "axios";
import User from "./User";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/user/search?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUsers(response.data.user));
  }, [filter]);

  return (
    <div className="mt-4 flex flex-col space-y-4">
      <h1 className="font-semibold text-2xl">Users</h1>
      <input
        className="p-2 border-1 border-gray-200 w-full rounded-sm"
        type="text"
        placeholder="Search users..."
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="flex flex-col space-y-2">
        {users.map((user) => {
          return <User key={user._id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default Users;
