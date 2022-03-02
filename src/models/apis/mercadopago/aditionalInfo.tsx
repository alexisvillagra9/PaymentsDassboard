import { IMercadopagoItem } from "./items";
export interface IMercadopagoAditionalInfo {
  ip_address: string;
  authentication_code: string | null;
  available_balance: string | null;
  items: IMercadopagoItem[];
  nsu_processadora: string | null;
}
