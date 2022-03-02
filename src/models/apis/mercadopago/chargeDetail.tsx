import { IMercadopagoChargesDetailAccount } from "./chargeDetailAccounts";
import { IMercadopagoChargesDetailAmounts } from "./chargeDetailAmounts";
export interface IMercadopagoChargesDetail {
  accounts: IMercadopagoChargesDetailAccount;
  amounts: IMercadopagoChargesDetailAmounts;
  client_id: number;
  date_created: Date;
  id: string;
  last_updated: Date;
  metadata: any;
  name: string;
  refund_charges: any[];
  reserve_id: string;
  type: string;
}
