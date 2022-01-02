import { IResult } from "./result";
export interface IPaymentOperationAttempt {
  date: Date;
  _id: string;
  operation: string;
  result: IResult;
  createdAt: Date;
  updatedAt: Date;
}
