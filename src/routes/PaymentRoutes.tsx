import { Route, Routes } from "react-router-dom";
import { IPaymentRoute } from "../models/app/payment/paymentRoute";
import { File } from "../screens/files/File";
import { PaymentDetail } from "../screens/paymentDetail/PaymentDetail";
import { Payments } from "../screens/payments/Payments";

export const PaymentRoutes = (paymentRouteProps: IPaymentRoute) => {
  const { currentView } = paymentRouteProps;

  // const { pathname, search } = useLocation();
  // console.log(pathname, search);

  return (
    <Routes>
      <Route path="/home" element={<Payments {...paymentRouteProps} />} />
      <Route path="/files" element={<File />} />
      <Route
        path="/payment-detail/:payment_operation_id"
        element={<PaymentDetail currentView={currentView} />}
      />
      <Route path="/*" element={<Payments {...paymentRouteProps} />} />
    </Routes>
  );
};
