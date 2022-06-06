import { IpaymentOperationLifecycleType } from "./paymentOperationLifecycleType";
export interface IPaymentOperationLifecycle {
  _id: string;
  date: Date;
  operation: string;
  type: IpaymentOperationLifecycleType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
