import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import React from "react";
import { IResult } from "../../models/apis/wallet/result";
import { IStatusResult } from "../../models/apis/wallet/statusResult";
import "./PaymentDetailStatus.css";


export const PaymentDetailStatus = ({
  result,
}: {
  result: IResult | undefined | any;
}) => {
  const statuses = Object.keys(result || {}).filter(
    (x: string) => x !== "status"
  );

  const iconSelect = (type: string) => {
    return (
      <>
        {type === "tickets" && <ConfirmationNumberOutlinedIcon />}
        {type === "payment" && <AttachMoneyOutlinedIcon />}
        {type === "hermes" && <PeopleOutlinedIcon />}
        {type === "preapproval" && <CreditCardOutlinedIcon />}
      </>
    );
  };

  const typeText = (type: string) => {
    let typeText = "";
    if (type === "tickets") typeText = "TICKETS";
    if (type === "payment") typeText = "PAGO";
    if (type === "preapproval") typeText = "SUSCRIPCION";
    if (type === "hermes") typeText = "HERMES";
    return typeText;
  };

  const ItemStatus = ({
    status,
    type,
  }: {
    status: IStatusResult;
    type: string;
  }) => {
    const { description, code, date } = status;
    return (
      <>
        <ListItemAvatar>
          <Avatar className="payment-avatar">{iconSelect(type)}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${typeText(type)} -  ${description}`}
          secondary={date}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "medium",
            letterSpacing: 0,
            color: "var(--color-primary)",
          }}
        />
        <Stack gap="1rem" flexDirection="row" alignItems="center">
          {code === "OK" ? (
            <CheckCircleOutlinedIcon color="success" fontSize="large" />
          ) : (
            <CancelOutlinedIcon color="error" fontSize="large" />
          )}
        </Stack>
      </>
    );
  };
  return (
    <>
      {result ? (
        <>
          <List>
            {statuses.map((sts, idx) => {
              return (
                <ListItem key={sts} divider={idx < statuses.length - 1}>
                  <ItemStatus status={result[sts]} type={sts}></ItemStatus>
                </ListItem>
              );
            })}
          </List>
        </>
      ) : (
        <>No existen transacciones para esta operacion actualmente</>
      )}
    </>
  );
};
