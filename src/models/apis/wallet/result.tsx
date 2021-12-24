import { IStatusResult } from "./statusResult";
export interface IResult {
  payment?: IStatusResult;
  hermes?: IStatusResult;
  ticket?: IStatusResult;
  status?: IStatusResult;
}
