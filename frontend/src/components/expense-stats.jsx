import React from "react";

const Expensetrack = ({ chartDataResponse }) => {
  return (
    <div className="w-full">
      <div
        className="flex md:flex-col overflow-x-auto md:overflow-x-hidden gap-4
      "
      >
        {/* Card 1 */}
        <div className="min-w-[280px] md:min-w-full bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] p-4 rounded-xl flex-shrink-0 shadow-lg">
          <h3 className="text-base text-blue-200 mb-2 tracking-wide">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-white">
            ${chartDataResponse.totalAmount}
          </p>
          <p className="text-sm text-indigo-200 mt-2">
            Items {chartDataResponse.totalItems}
          </p>
        </div>

        {/* Card 2 */}
        <div className="min-w-[280px] md:min-w-full bg-gradient-to-br from-[#059669] to-[#065F46] p-4 rounded-xl flex-shrink-0 shadow-lg">
          <h3 className="text-base text-green-200 mb-2 tracking-wide">
            Total Amount Remaining
          </h3>
          <p className="text-3xl font-bold text-white">
            ${10000 - chartDataResponse.totalAmount}
          </p>
        </div>

        {/* Card 3 */}
        <div className="min-w-[280px] md:min-w-full bg-gradient-to-br from-[#9333EA] to-[#6B21A8] p-4 rounded-xl flex-shrink-0 shadow-lg">
          <h3 className="text-base text-purple-200 tracking-wide mb-3">
            Yearly Limit
          </h3>
          <p className="text-2xl font-bold text-white mb-4">$10000</p>
          <div className="w-full h-2 bg-indigo-700 rounded-full overflow-hidden">
            <div
              className="bg-yellow-400 h-2 rounded-full"
              style={{
                width: `${
                  100 - (chartDataResponse.totalAmount / 10000) * 100
                }%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-indigo-200 mt-2">
            Remaining{" "}
            {100 - ((chartDataResponse.totalAmount / 10000) * 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default Expensetrack;
