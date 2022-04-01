import { useContext } from "react";
import { AppContext } from "./AppContext";

const Confirm = () => {
  const { completedOrder } = useContext(AppContext);
  return (
    <div>
      <div>Thank you for your order!</div>
      <div>
        Order size of {completedOrder.size} totalling $
        {completedOrder.totalCost}
      </div>
    </div>
  );
};

export default Confirm;
