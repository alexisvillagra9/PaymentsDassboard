import { IPointOfSale } from "../store/pointOfSale";
import { IOperationItem } from "../wallet/operationItem";
import { IFeesPayment } from "./feesPayment";
import { IGateway } from "./gateway";
import { IPartnerOperation } from "./partnerOperation";
import { IPaymentOperationOrigin } from "./paymentOperationOrigin";
import { IPaymentOperationStatus } from "./paymentOperationStatus";
import { IRedirect } from "./redirect";
import { IResult } from "./result";

export interface IPaymentOperation {
  _id: string;
  partner: IPartnerOperation;
  items: IOperationItem[];
  point_of_sale: IPointOfSale;
  fees_payment: IFeesPayment;
  result?: IResult;
  origin: IPaymentOperationOrigin;
  status: IPaymentOperationStatus;
  gateway: IGateway;
  subtotal: number;
  transaction_amount: number;
  redirect: IRedirect;
  external_references: string[];
  createdAt: Date;
  updatedAt: Date;
}
