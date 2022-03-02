import { IMercadopagoBusinessInfo } from "./businessInfo";

export interface IMercadopagoPointOfInteraction {
  business_info: IMercadopagoBusinessInfo;
  type: string;
}
