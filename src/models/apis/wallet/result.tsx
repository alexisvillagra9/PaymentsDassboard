import { IStatusResult } from "./statusResult";
export interface IResult {
  payment?: IStatusResult;
  hermes?: IStatusResult;
  ticket?: IStatusResult;
  preapproval?: IStatusResult;
  status?: IStatusResult;
}
