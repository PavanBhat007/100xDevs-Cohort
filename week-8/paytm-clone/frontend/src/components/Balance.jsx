import { useEffect, useState } from "react";
import axios from "axios";

const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/accounts/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      })
      .then((response) => {
        setBalance(parseInt(response.data.balance));
      });
  });

  return (
    <div className="flex gap-x-2 w-full border-b-1 border-gray-200">
      <p className="text-xl font-semibold">Your Balance: </p>
      <p className="text-xl font-bold">Rs. {balance}/-</p>
    </div>
  );
};

export default Balance;
