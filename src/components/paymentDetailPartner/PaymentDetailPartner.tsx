import Stack from "@mui/material/Stack";
import React from "react";
import { IPartnerOperation } from "../../models/apis/wallet/partnerOperation";
import "./PaymentDetailPartner.css";

export const PaymentDetailPartner = ({
  partner,
}: {
  partner: IPartnerOperation | undefined;
}) => {
  const {
    name,
    lastName,
    dni,
    email,
    birthday,
    sex,
    phone_number,
    retired,
    partner_id,
  } = partner || {};

  const Item = ({
    keyData,
    valueData,
  }: {
    keyData: string;
    valueData: string;
  }) => {
    return (
      <div className="partner-detail-item">
        <div className="partner-detail-item-key">{keyData}:</div>
        <div className="partner-detail-item-value">{valueData}</div>
      </div>
    );
  };
  return (
    <div>
      <Stack gap="1.5rem" flexDirection="row" flexWrap="wrap">
        <Item keyData={"Nombre"} valueData={`${name}`} />
        <Item keyData={"Apellido"} valueData={`${lastName}`} />
        <Item keyData={"Nro. Documento"} valueData={`${dni}`} />
        <Item keyData={"Email"} valueData={`${email}`} />
        <Item keyData={"Fecha de nacimiento"} valueData={`${birthday}`} />
        <Item
          keyData={"Genero"}
          valueData={`${sex === "M" ? "Masculino" : "Femenino"}`}
        />
        <Item keyData={"Numero de Telefono"} valueData={`${phone_number}`} />
        <Item
          keyData={"Jubilado"}
          valueData={`${retired === "S" ? "SI" : "NO"}`}
        />
        <Item keyData={"ID Hermes"} valueData={`${partner_id}`} />
      </Stack>
    </div>
  );
};
