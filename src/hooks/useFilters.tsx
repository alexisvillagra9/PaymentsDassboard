import { useContext } from "react";
import { GeneralContext } from "../context/general/generalContext";

export const useFilters = (initialState = []) => {
  const { paymentOperationsFiltered: payOpsFilteredContext } =
    useContext(GeneralContext);

  const getTotalAmount = () => {
    const total = (payOpsFilteredContext || [])
      .filter((po) => po?.result?.payment?.code === "OK")
      .reduce((sum: number, po1) => sum + po1?.transaction_amount || 0, 0);
    return total;
  };

  return {
    getTotalAmount,
  };
};
