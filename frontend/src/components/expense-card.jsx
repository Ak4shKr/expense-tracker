import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Expenseleft from "./expense-search";
import { useModal } from "../hooks/useModal";
import { Button, ScrollArea, Text, Input } from "@mantine/core";
import service from "../services/service";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import EditExpenseModal from "./edit-expense";

const Expensecard = ({ expensesResponse }) => {
  const { openConfirm, onClose } = useModal();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    const searchTerm = query.trim().toLowerCase();
    console.log(expensesResponse);
    if (!searchTerm) return expensesResponse;

    return expensesResponse.filter((expensesResponse) => {
      const titleMatch = expensesResponse.title
        .toLowerCase()
        .includes(searchTerm);
      const typeMatch = expensesResponse.category
        .toLowerCase()
        .includes(searchTerm);
      return titleMatch || typeMatch;
    });
  };

  const filteredExpenses = handleSearch(searchQuery);

  return (
    <>
      <Expenseleft handleSearch={setSearchQuery} />{" "}
      {/* Pass the setSearchQuery function here */}
      <ScrollArea scrollbarSize={0}>
        {filteredExpenses.map((expense, index) => (
          <div
            key={index}
            className="bg-[#111827] rounded-sm shadow-md p-3 md:p-4 mb-4 flex items-center justify-between"
          >
            {/* Left Side */}
            <div className="flex items-center gap-3">
              <img
                src={`${expense.category}.png`}
                alt="Expense Icon"
                className="w-12 h-12 rounded-full object-cover bg-gray-700 p-2"
              />
              <div>
                <h2 className="text-sm md:text-base font-medium text-white line-clamp-1">
                  {expense.title}
                </h2>
                <p className="text-xs text-gray-400">
                  {expense.date.split("T")[0]} • {expense.category}
                </p>
                <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                  {expense.description}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-right flex flex-col items-end justify-between h-full">
              <p className="text-lg md:text-xl font-semibold text-red-500 text-nowrap">
                - ${expense.amount}
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  className="text-blue-500 hover:text-blue-600 cursor-pointer"
                  onClick={() =>
                    openConfirm({
                      content: (
                        <EditExpenseModal
                          onClose={onClose}
                          expenseData={expense}
                        />
                      ),
                    })
                  }
                >
                  <FiEdit size={16} />
                </button>
                <button
                  className="text-red-400 hover:text-red-500 cursor-pointer"
                  onClick={() =>
                    openConfirm({
                      content: (
                        <DeleteExpenseModal onclose={onClose} id={expense.id} />
                      ),
                    })
                  }
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </>
  );
};

export default Expensecard;

const DeleteExpenseModal = ({ onclose, id }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const handledelete = async () => {
    // Call the delete API here using the id
    setLoading(true);
    const response = await service.delete(`/delete-expense/${id}`);
    if (response.data.success) {
      queryClient.invalidateQueries(["expenses", "chart-data"]);
      notifications.show({
        title: "Expense Deleted",
        message: "Expense deleted successfully",
        color: "green",
      });

      onclose();
      setLoading(false);
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to delete expense",
        color: "red",
      });
      setLoading(false);
      onclose();
    }
  };

  return (
    <>
      <Text size="md" mb="xl">
        Are you sure you want to delete this expense?
      </Text>
      <div className="flex justify-end gap-2">
        <Button variant="default" onClick={onclose}>
          Cancel
        </Button>
        <Button color="red" onClick={() => handledelete(id)} loading={loading}>
          Confirm
        </Button>
      </div>
    </>
  );
};
