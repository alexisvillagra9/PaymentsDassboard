import { Dispatch, SetStateAction } from "react";
import { IPaymentOperation } from "../../apis/wallet/paymentOperation";
import { IPaymentOperationFilter } from "../../apis/wallet/paymentOperationFilter";
import { IPaymentOperationOrigin } from "../../apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../apis/wallet/paymentOperationStatus";

export interface IPaymentRoute {
  totalCount: number;
  totalAmount: number;
  actualPage: number;
  totalPages: number;
  pageSize: number;
  operationStatuses: IPaymentOperationStatus[];
  operationOrigins: IPaymentOperationOrigin[];
  operationStatusesFilter: string[] | null;
  operationOriginsFilter: string[] | null;
  search: string;
  dateTo: Date | null;
  dateFrom: Date | null;
  loadingPO: boolean;
  loadingPOExcel: boolean;
  paymentOperations: IPaymentOperation[] | null;
  selectedOrigins: string[];
  selectedStatuses: string[];
  currentView: string;
  setDateTo: Dispatch<SetStateAction<Date | null>>;
  setDateFrom: Dispatch<SetStateAction<Date | null>>;
  setOperationOriginsFilter: Dispatch<SetStateAction<string[] | null>>;
  setOperationStatusesFilter: Dispatch<SetStateAction<string[] | null>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setSelectedOrigins: Dispatch<SetStateAction<string[]>>;
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  setCurrentView: Dispatch<SetStateAction<string>>;
  getOperations: (e: IPaymentOperationFilter) => void;
  downloadExcel: () => void;
}
