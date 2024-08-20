import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { currencyFormat } from "../../helpers/general";
import { IOperationItem } from "../../models/apis/wallet/operationItem";
import "./PaymentDetailItems.css";

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
        <ListItem key={-1} className={"item-list-item list-item-top"}>
          <Stack direction="row" width="100%">
            <div className="item-title">Descripcion de pago</div>
            <div className="item-quantity">Cantidad</div>
            <div className="item-price">Precio Unitario</div>
          </Stack>
        </ListItem>
        <Divider></Divider>
        {items.map((item, idx) => {
          const { title, quantity, unit_price = 0 } = item;
          return (
            <ListItem key={idx} className={"item-list-item list-item-detail"}>
              <Stack direction="row" width="100%">
                <div className="item-title">{title}</div>
                <div className="item-quantity">{quantity}</div>
                <div className="item-price item-price-currency">
                  {currencyFormat(unit_price)}
                </div>
              </Stack>
            </ListItem>
          );
        })}
        <Divider></Divider>
        <ListItem key={-2} className={"item-list-item"}>
          <Stack direction="row" width="100%">
            <div className="item-title"></div>
            <div className="item-quantity">Subtotal</div>
            <div className="item-price ">
              <Chip
                label={currencyFormat(subtotal)}
                size="small"
                className="chip-container"
              />
            </div>
          </Stack>
        </ListItem>
        <ListItem key={-3} className={"item-list-item"} disablePadding>
          <Stack direction="row" width="100%">
            <div className="item-title"></div>
            <div className="item-quantity">Total</div>
            <div className="item-price ">
              <Chip
                label={currencyFormat(transaction_amount)}
                size="small"
                className="chip-container"
              />
            </div>
          </Stack>
        </ListItem>
      </List>
    </>
  );
};
