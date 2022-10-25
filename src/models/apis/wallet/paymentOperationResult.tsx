import { IPaymentOperation } from "./paymentOperation";

export interface IPaymentOperationResult {
  data: IPaymentOperation[];
  totalCount: number;
  totalAmount: number;
  pageCount: number;
  currentPage: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
}
