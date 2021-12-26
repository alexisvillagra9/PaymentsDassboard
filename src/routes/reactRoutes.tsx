import { useRoutes } from "react-router-dom";
import { PaymentDetail } from "../screens/paymentDetail/PaymentDetail";
import { Payments } from "../screens/payments/Payments";

export const AppRoutes = () => {
  const reactRoutes = [
    {
      path: "/",
      element: <Payments />,
    },
    {
      path: "/home",
      element: <Payments />,
    },
    {
      path: "/*",
      element: <Payments />,
    },
    {
      path: "/payment-detail",
      element: <PaymentDetail />,
    },
  ];

  const routes = useRoutes(reactRoutes);
  return routes;
};
