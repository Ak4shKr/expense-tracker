import React from "react";
import { Navbar } from "../components/navbar";
import Mainbody from "../components/mainbody";
import service from "../services/service";
import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../utils/protected";

const Home = () => {
  const { data: expensesData, isLoading: isLoadingExpenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      if (!isLoggedIn()) {
        return null;
      }
      const response = await service("/all-expenses");
      if (!response.status) {
        throw new Error("Failed to fetch expenses");
      }
      return response.data.expenses;
    },
    onSuccess: () => {
      console.log("Expenses fetched successfully");
    },
    onError: (error) => {
      console.error("Error fetching expenses:", error);
    },
  });

  const { data: ChartData, isLoading: isLoadingChart } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      if (!isLoggedIn()) {
        return null;
      }
      const response = await service("/chart-data");
      if (!response.status) {
        throw new Error("Failed to fetch user info");
      }

      return response.data.data;
    },
    onSuccess: () => {
      console.log("User info fetched successfully");
    },
    onError: (error) => {
      console.error("Error fetching user info:", error);
    },
  });

  if ((isLoadingExpenses || isLoadingChart) && isLoggedIn()) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar chartDataResponse={ChartData} />
      <Mainbody expensesResponse={expensesData} chartDataResponse={ChartData} />
    </>
  );
};

export default Home;
