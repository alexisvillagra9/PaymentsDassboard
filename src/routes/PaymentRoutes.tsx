import { Route, Routes } from "react-router-dom";
import { PaymentDetail } from "../screens/paymentDetail/PaymentDetail";
import { Payments } from "../screens/payments/Payments";

export const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Payments />} />
      <Route path="/payment-detail" element={<PaymentDetail />} />
      <Route path="/*" element={<Payments />} />
    </Routes>
  );
};
