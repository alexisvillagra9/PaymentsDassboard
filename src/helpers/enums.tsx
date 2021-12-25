export enum EPaymentOperationOrigin {
  Subscription = "SUS",
  RegistreNewPartner = "RNP",
  PaymentOfFees = "POF",
  SubscriptionToAD = "ADA",
  QRPayment = "QRP",
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
