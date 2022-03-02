import { ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import React from "react";
import { IMercadopagoPayment } from "../../models/apis/mercadopago/payment";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import "./PaymentDetailMercadopago.css";
import ListItemText from "@mui/material/ListItemText";
import { GiReceiveMoney } from "react-icons/gi";

export const PaymentDetailMercadopago = ({
  payment,
}: {
  payment: IMercadopagoPayment | null;
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <List
        sx={{
          color: "var(--primary-color)!important",
          backgroundColor: "var(--primary-color)!important",
        }}
      >
        <ListItem>
          <ListItemIcon>
            <PaidOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Cobro" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GiReceiveMoney size="1.5rem" />
          </ListItemIcon>
          <ListItemText primary="Contracargo" />
        </ListItem>
      </List>
    </Box>
  );
};
