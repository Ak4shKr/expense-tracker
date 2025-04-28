import React from "react";
import Expensecard from "./expense-card";
import Expensetrack from "./expense-stats";
import { isLoggedIn } from "../utils/protected";
import { useModal } from "../hooks/useModal";
import { Login } from "./login";

const Mainbody = ({ expensesResponse, chartDataResponse }) => {
  const { openConfirm, onClose } = useModal();
  console.log("Mainbody", expensesResponse, chartDataResponse);
  if (!isLoggedIn()) {
    return (
      <div className="flex flex-col h-[calc(100dvh-3rem)] items-center justify-center bg-gray-900 text-white">
        <div className="bg-[#192238] p-6 rounded-xl shadow-md text-center border border-gray-700">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="mb-6">
            Sign in to access our application and manage your expenses.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-1 px-4 rounded"
            onClick={() => {
              openConfirm({
                content: <Login onClose={onClose} />,
              });
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col-reverse md:flex-row justify-between gap-4 p-4 mt-4">
     
      <div className="h-[calc(100dvh-6rem)] flex flex-col w-full md:w-2/3 bg-[#192238] p-4 rounded-xl border border-gray-700 space-y-4">
        <Expensecard expensesResponse={expensesResponse} />
      </div>

   
      <div className="w-full h-fit md:w-1/3 bg-[#192238] p-4 rounded-xl border border-gray-700 space-y-4">
        <Expensetrack chartDataResponse={chartDataResponse} />
      </div>
    </div>
  );
};

export default Mainbody;
