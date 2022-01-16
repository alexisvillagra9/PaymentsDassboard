import { Route, BrowserRouter, Routes } from "react-router-dom";
import { PaymentDetail } from "../screens/paymentDetail/PaymentDetail";
import { Payments } from "../screens/payments/Payments";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Payments />} />
        <Route path="/payment-detail" element={<PaymentDetail />} />
        <Route path="/" element={<Payments />} />
        <Route path="/*" element={<Payments />} />
      </Routes>
    </BrowserRouter>
  );
};
