import { IMercadopagoIdentification } from "./identification";
import { IMercadopagoPhone } from "./phone";

export interface IMercadopagoPayer {
  email: string;
  entity_type: string;
  first_name: string;
  id: string;
  identification: IMercadopagoIdentification;
  last_name: string;
  operator_id: string;
  phone: IMercadopagoPhone;
  type: string;
}
