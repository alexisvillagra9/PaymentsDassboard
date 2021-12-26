import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import React from "react";
import { IOperationItem } from "../../models/apis/wallet/operationItem";
import "./PaymentDetailItems.css";

export const PaymentDetailItems = ({ items }: { items: IOperationItem[] }) => {
  return (
    <>
      <List>
        <ListItem disablePadding key={-1}>
          <Stack direction="row" width="100%">
            <div className="item-title">Descripcion de pago</div>
            <div className="item-quantity">Cantidad</div>
            <div className="item-price">Precio Unitario</div>
          </Stack>
        </ListItem>
        {items.map((item, idx) => {
          const { title, quantity, unit_price } = item;
          return (
            <ListItem disablePadding key={idx}>
              <Stack direction="row" width="100%">
                <div className="item-title">{title}</div>
                <div className="item-quantity">{quantity}</div>
                <div className="item-price">{unit_price}</div>
              </Stack>
            </ListItem>
          );
        })}
        {/* <Divider></Divider> */}
      </List>
    </>
  );
};
