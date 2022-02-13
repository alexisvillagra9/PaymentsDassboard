import { Dispatch, SetStateAction } from "react";
import { IPaymentOperation } from "../apis/wallet/paymentOperation";
import { IPaymentOperationStatus } from "../apis/wallet/paymentOperationStatus";
import { IPaymentOperationOrigin } from "../apis/wallet/paymentOperationOrigin";
export interface IGeneralContext {
  paymentOperations: IPaymentOperation[] | null;
  operationStatuses: IPaymentOperationStatus[];
  operationOrigins: IPaymentOperationOrigin[];
  actualPage: number;
  setPaymentOperations: Dispatch<SetStateAction<IPaymentOperation[] | null>>;
  setOperationStatuses: Dispatch<SetStateAction<IPaymentOperationStatus[]>>;
  setOperationOrigins: Dispatch<SetStateAction<IPaymentOperationOrigin[]>>;
  setActualPage: Dispatch<SetStateAction<number>>;
}
