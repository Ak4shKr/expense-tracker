import { Button, Input, Select, Textarea } from "@mantine/core";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { DateInput } from "@mantine/dates";
import service from "../services/service";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

const AddExpenseModal = ({ edit = false, onClose }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValueChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    const response = await service.post("/add-expense", formData);
    console.log(response);
    if (response.data.success) {
      notifications.show({
        title: "Expense Added",
        message: "Your expense has been added successfully.",
        color: "green",
      });
      queryClient.invalidateQueries(["expenses", "chart-data"]);
      setLoading(false);
      onClose();
    } else {
      notifications.show({
        title: "Error",
        message: "Failed to add expense",
        color: "red",
      });
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg shadow-md border-gray-400">
      <div className="flex items-center justify-between px-2 py-2 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">
          {edit ? "Edit" : "Add"} Expense
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition cursor-pointer"
        >
          <IoMdClose size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-2 space-y-2">
        <Input.Wrapper label="Expense Title" required>
          <Input
            name="title"
            placeholder="Enter expense title"
            value={formData.title}
            onChange={handleInputChange}
            styles={{
              input: {
                backgroundColor: "#111111",
                color: "#ffffff",
              },
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper label="Expense Amount" required>
          <Input
            name="amount"
            placeholder="Enter amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
            styles={{
              input: {
                backgroundColor: "#111111",
                color: "#ffffff",
              },
            }}
          />
        </Input.Wrapper>

        <Textarea
          name="description"
          label="Expense Description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleInputChange}
          styles={{
            input: {
              backgroundColor: "#111111",
              color: "#ffffff",
            },
          }}
        />

        <DateInput
          value={formData.date}
          onChange={(value) => handleValueChange("date", value)}
          label="Date of Expense"
          placeholder="Select date"
          required
          styles={{
            input: {
              backgroundColor: "#111111",
              color: "#ffffff",
            },
          }}
        />

        <Select
          label="Expense Category"
          placeholder="Select category"
          value={formData.category}
          onChange={(value) => handleValueChange("category", value)}
          data={[
            { value: "grocery", label: "Grocery" },
            { value: "food", label: "Food" },
            { value: "travel", label: "Travel" },
            { value: "shopping", label: "Shopping" },
          ]}
          styles={{
            input: {
              backgroundColor: "#111111",
              color: "#ffffff",
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          size="sm"
          color="indigo"
          className="mt-4"
          loading={loading}
        >
          Submit Expense
        </Button>
      </form>
    </div>
  );
};

export default AddExpenseModal;
