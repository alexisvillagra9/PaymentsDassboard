import { IOperationItemType } from "./operationItemType";
import { IProduct } from "../store/product";

export interface IOperationItem {
  type: IOperationItemType;
  title: string;
  description: string;
  picture_url: string;
  category_id: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  product: IProduct;
  postpaid: boolean;
}
