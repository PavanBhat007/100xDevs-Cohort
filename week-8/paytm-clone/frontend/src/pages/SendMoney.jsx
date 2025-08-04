import { useSearchParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const receiverId = searchParams.get("id");
  const receiverName = searchParams.get("name");

  return (
    <div className="h-screen w-full bg-slate-100 flex flex-col items-center justify-center">
      <div className="w-2/3 bg-white md:w-150 mx-auto shadow-lg p-8 rounded-md flex flex-col">
        <div className="text-center">
          <Heading label={"Send Money"} />
        </div>

        <div className="flex items-center mt-10 mb-4 gap-x-2">
          <Avatar
            letter={receiverName[0]}
            colour={"green-500"}
            text={"white"}
          />
          <div>
            <p className="text-sm">Sending to ...</p>
            <p className="font-bold text-lg">{receiverName}</p>
          </div>
        </div>

        <InputBox
          label={"Amount (in Rs.)"}
          placeholder={"Enter Amount"}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <button
          className="bg-green-500 py-1 w-full my-3 cursor-pointer rounded-sm text-white font-semibold"
          onClick={async () => {
            await axios.post(
              "http://localhost:8080/api/v1/accounts/transfer",
              {
                to: receiverId,
                amount: amount,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            navigate("/dashboard");
          }}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default SendMoney;
