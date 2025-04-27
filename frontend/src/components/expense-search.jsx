import { Input } from "@mantine/core";
import { FiPlus } from "react-icons/fi";
import { useModal } from "../hooks/useModal";
import AddExpenseModal from "./add-expense";

const Expenseleft = ({ handleSearch }) => {
  const { openConfirm, onClose } = useModal();

  const handleInputChange = (e) => {
    handleSearch(e.target.value); // Pass the search query to the parent component's function
  };

  return (
    <div>
      <div className="w-full flex items-center gap-4">
        <Input
          placeholder="Search expenses..."
          className="w-full"
          onChange={handleInputChange} // Listen for input changes and trigger search
        />
        <button
          className="text-sm px-4 py-1 bg-[#2563EB] text-white border border-blue-600 rounded-md"
          onClick={() => {
            openConfirm({
              content: <AddExpenseModal onClose={onClose} />,
            });
          }}
        >
          <span className="flex items-center gap-2">
            <FiPlus /> Add
          </span>
        </button>
      </div>
    </div>
  );
};

export default Expenseleft;
