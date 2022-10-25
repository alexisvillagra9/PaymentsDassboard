export interface IPaymentOperationFilter {
  page: string | number;
  pageSize: string | number;
  search?: string;
  sort?: string;
  sortCriteria?: string;
  statuses?: string[] | null;
  origins?: string[] | null;
  dateFrom?: Date | null;
  dateTo?: Date | null;
}
