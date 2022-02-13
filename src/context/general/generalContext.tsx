import { createContext } from "react";
import { IGeneralContext } from "../../models/context/general";
const general: IGeneralContext = {
  paymentOperations: null,
  operationStatuses: [],
  operationOrigins: [],
  actualPage: 1,
  setPaymentOperations: () => {},
  setOperationStatuses: () => {},
  setOperationOrigins: () => {},
  setActualPage: () => {},
};
export const GeneralContext = createContext(general);
