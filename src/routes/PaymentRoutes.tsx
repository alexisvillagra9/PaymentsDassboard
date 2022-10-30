import { Route, Routes, useLocation } from "react-router-dom";
import { IPaymentRoute } from "../models/app/payment/paymentRoute";
import { PaymentDetail } from "../screens/paymentDetail/PaymentDetail";
import { Payments } from "../screens/payments/Payments";

export const PaymentRoutes = (paymentRouteProps: IPaymentRoute) => {
  const { currentView } = paymentRouteProps;

  const { pathname, search } = useLocation();
  // console.log(pathname, search);

  return (
    <Routes>
      <Route path="/home" element={<Payments {...paymentRouteProps} />} />
      <Route
        path="/payment-detail/:payment_operation_id"
        element={<PaymentDetail currentView={currentView} />}
      />
      <Route path="/*" element={<Payments {...paymentRouteProps} />} />
    </Routes>
  );
};
