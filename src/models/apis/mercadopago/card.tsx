import { IMercadopagoCardholder } from "./cardholder";

export interface IMercadopagoCard {
  cardholder: IMercadopagoCardholder
  date_created: Date;
  date_last_updated: Date;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: string | number;
  last_four_digits: string;
}
