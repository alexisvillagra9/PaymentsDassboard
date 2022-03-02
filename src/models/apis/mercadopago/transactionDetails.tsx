export interface IMercadopagoTransactionDetails {
  acquirer_reference: string | null;
  external_resource_url: string | null;
  financial_institution: string | null;
  installment_amount: number;
  net_received_amount: number;
  overpaid_amount: number;
  payable_deferral_period: string | null;
  payment_method_reference_id: string | null;
  total_paid_amount: number;
}
