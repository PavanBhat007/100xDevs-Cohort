import { RevenueCard } from "../../components/RevenueCard";

const meta = {
  component: RevenueCard,
};

export default meta;

// Define stories as different variants
export const BigAmount = {
  args: {
    title: "Amount pending",
    amount: "1,99,67,123.00",
    orderCount: "13",
  },
};

export const SmallAmount = {
  args: {
    title: "Amount pending",
    amount: "123.00",
    orderCount: "13",
  },
};
