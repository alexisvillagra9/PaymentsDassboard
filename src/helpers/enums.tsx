export enum EPaymentOperationOrigin {
  Subscription = "SUS",
  RegistreNewPartner = "RNP",
  PaymentOfFees = "POF",
  SubscriptionToAD = "ADA",
  QRPayment = "QRP",
  LocationBuy = "CDU",
}

export enum EPaymentOperationStatus {
  Generated = "GEN",
  Terminated = "TER",
  VoluntarilyCanceled = "CAN",
  PendingSubscription = "SPE",
}

export enum EPaymentStatus {
  Success = "OK",
  Pending = "PEN",
  Error = "NO_OK",
}

export enum EAccordionPanel {
  items = "items",
  partner = "partner",
  status = "status",
  attempts = "attempts",
}
