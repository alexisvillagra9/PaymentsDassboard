import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { IOperationItem } from "../../models/apis/wallet/operationItem";
import "./PaymentDetailItems.css";
import { currencyFormat } from "../../helpers/general";

export const PaymentDetailItems = ({
  items,
  subtotal,
  transaction_amount,
}: {
  items: IOperationItem[];
  subtotal: number;
  transaction_amount: number;
}) => {
  return (
    <>
      <List>
        <ListItem key={-1}>
          <Stack direction="row" width="100%">
            <div className="item-title">Descripcion de pago</div>
            <div className="item-quantity">Cantidad</div>
            <div className="item-price">Precio Unitario</div>
          </Stack>
        </ListItem>
        <Divider></Divider>
        {items.map((item, idx) => {
          const { title, quantity, unit_price } = item;
          return (
            <ListItem key={idx}>
              <Stack direction="row" width="100%">
                <div className="item-title">{title}</div>
                <div className="item-quantity">{quantity}</div>
                <div className="item-price">{currencyFormat(unit_price)}</div>
              </Stack>
            </ListItem>
          );
        })}
        <Divider></Divider>
        <ListItem key={-2}>
          <Stack direction="row" width="100%">
            <div className="item-title"></div>
            <div className="item-quantity">Subtotal</div>
            <div className="item-price item-total">
              {currencyFormat(subtotal)}
            </div>
          </Stack>
        </ListItem>
        <ListItem key={-3}>
          <Stack direction="row" width="100%">
            <div className="item-title"></div>
            <div className="item-quantity">Total</div>
            <div className="item-price item-total">
              {currencyFormat(transaction_amount)}
            </div>
          </Stack>
        </ListItem>
      </List>
    </>
  );
};
