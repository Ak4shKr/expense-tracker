import { Drawer } from "@mantine/core";
import { FiBarChart2 } from "react-icons/fi";
import { useState } from "react";
import { isLoggedIn } from "../utils/protected";
import ExpenseChart from "./expenses-chart";

export const Navbar = ({ chartDataResponse }) => {
  const [opened, setOpened] = useState(false);

  const openDrawer = () => setOpened(true);
  const closeDrawer = () => setOpened(false);

  return (
    <div className="flex justify-between px-4 py-2 items-center border-b sticky top-0 z-10 bg-[#141B2A]">
      <p className="text-lg md:text-xl font-semibold text-white">
        Expense Tracker
      </p>
      <div className="flex gap-4 items-center">
        {isLoggedIn() && (
          <button
            onClick={openDrawer}
            className="text-xs cursor-pointer px-3 border border-white/80 text-white/90 rounded-md hover:text-[#F0185C] transition-all"
          >
            <span className="flex items-center gap-1">
              <FiBarChart2 color="red" />
              Visualise
            </span>
          </button>
        )}
      </div>

      <Drawer
        opened={opened}
        onClose={closeDrawer}
        position="bottom"
        title="Expense Visualization"
        padding="xl"
        size="md"
      >
        <ExpenseChart chartDataResponse={chartDataResponse} />
      </Drawer>
    </div>
  );
};
