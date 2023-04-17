import { IMacroPayment } from "../../apis/macro/payment";
import { IMercadopagoPayment } from "../../apis/mercadopago/payment";
import { IPointOfSale } from "../../apis/store/pointOfSale";
import { IOperationItem } from "../../apis/wallet/operationItem";
import { IPartnerOperation } from "../../apis/wallet/partnerOperation";
import { IPaymentOperationAttempt } from "../../apis/wallet/paymentOperationAttempts";
import { IPaymentOperationLifecycle } from "../../apis/wallet/paymentOperationLifecycle";
import { IResult } from "../../apis/wallet/result";

export interface IPaymentDetailAccordion {
  panelId: string;
  title: string;
  handleChange: (panel: string) => any;
  defaultExpanded: boolean;
  items?: IOperationItem[];
  subtotal?: number;
  transaction_amount?: number;
  partner?: IPartnerOperation;
  result?: IResult;
  attempts?: IPaymentOperationAttempt[];
  attemptsLoading?: boolean;
  lifecycle?: IPaymentOperationLifecycle[];
  lifecycleLoading?: boolean;
  paymentMercadopago?: IMercadopagoPayment | null;
  paymentsMacro?: IMacroPayment[];
  pointOfSale?: IPointOfSale | null;
}
