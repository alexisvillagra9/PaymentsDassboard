export enum EPaymentOperationOrigin {
  Subscription = "SUS",
  RegistreNewPartner = "RNP",
  PaymentOfFees = "POF",
  SubscriptionToAD = "ADA",
  QRPayment = "QRP",
  LocationBuy = "CDU",
  Reactivate = "RIP",
}

export enum EPaymentOperationStatus {
  Generated = "GEN",
  Terminated = "TER",
  VoluntarilyCanceled = "CAN",
  PendingSubscription = "SPE",
  Error = "ERR",
  Retry = "RET",
  Test = "TES",
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
  mercadopago = "mercadopago",
}

export enum EPaymenMethodId {
  cordobesa = "Cordobesa",
  diners = "Dinner",
  debcabal = "Cabal",
  cabal = "Cabal",
  cencosud = "Cencosud",
  debmaster = "Mastercard",
  master = "Mastercard",
  debvisa = "Visa",
  naranja = "Naranja",
  maestro = "Maestro",
  cmr = "CMR",
  visa = "Visa",
  amex = "American Express",
  tarshop = "Tarjeta Shopping",
  argencard = "Argencard",
}

export enum EPaymenTypeId {
  credit_card = "tarjeta de crédito",
  debit_card = "tarjeta de débito",
}
