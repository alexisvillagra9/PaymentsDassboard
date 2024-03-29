import { Dispatch, SetStateAction } from "react";
import { IPaymentOperationFilter } from "../../apis/wallet/paymentOperationFilter";
import { IPaymentOperationOrigin } from "../../apis/wallet/paymentOperationOrigin";
import { IPaymentOperationStatus } from "../../apis/wallet/paymentOperationStatus";
import { IPaymentOperationGateway } from '../../apis/wallet/paymentOperationGateway';

export interface IPaymentFilter {
  totalCount: number;
  totalAmount: number;
  pageSize: number;
  operationStatuses: IPaymentOperationStatus[];
  operationOrigins: IPaymentOperationOrigin[];
  operationGateways: IPaymentOperationGateway[];
  operationStatusesFilter: string[] | null;
  operationOriginsFilter: string[] | null;
  operationGatewaysFilter: string[] | null;
  search: string;
  dateTo: Date | null;
  dateFrom: Date | null;
  selectedOrigins: string[];
  selectedStatuses: string[];
  loadingPOExcel: boolean;
  setDateTo: Dispatch<SetStateAction<Date | null>>;
  setDateFrom: Dispatch<SetStateAction<Date | null>>;
  setOperationOriginsFilter: Dispatch<SetStateAction<string[] | null>>;
  setOperationStatusesFilter: Dispatch<SetStateAction<string[] | null>>;
  setOperationGatewaysFilter: Dispatch<SetStateAction<string[] | null>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setSelectedOrigins: Dispatch<SetStateAction<string[]>>;
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
  getOperations: (e: IPaymentOperationFilter) => void;
  downloadExcel: () => void;
}
