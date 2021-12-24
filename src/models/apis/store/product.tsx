import { IProductType } from "./productType";
export interface IProduct {
  id: string;
  _id: string;
  name: string;
  type: IProductType;
}
