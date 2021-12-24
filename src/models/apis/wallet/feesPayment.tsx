import { IDebt } from "../partners/debt";
export interface IFeesPayment {
  cliId: number;
  totalAmount: number;
  debts: IDebt[];
  mercadoPagoId: string;
}
