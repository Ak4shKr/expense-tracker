import { BarChart, PieChart } from "@mantine/charts";
import React from "react";

const colors = [
  { color: "indigo.6" },
  { color: "yellow.6" },
  { color: "teal.6" },
  { color: "gray.6" },
];

const ExpenseChart = ({ chartDataResponse }) => {
  console.log("fdsf", chartDataResponse);
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">
          Category-wise Expense Distribution
        </h3>
        <PieChart
          withLabelsLine
          labelsPosition="outside"
          labelsType="percent"
          withLabels
          data={chartDataResponse.categoryStats.map((item, index) => ({
            name: item.category, 
            value: item.amount, 
            color: colors[index].color, 
          }))}
          height={300}
          withTooltip
          tooltipDataSource="segment"
          mx="auto"
        />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-4">
          Monthly Expense Breakdown
        </h3>
        <BarChart
          h={300}
          data={chartDataResponse.monthStats}
          dataKey="month"
          series={[{ name: "amount", color: "violet.6" }]}
          type="stacked"
        />
      </div>
    </div>
  );
};

export default ExpenseChart;
