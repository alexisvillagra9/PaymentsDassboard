import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import "./PaymentDetailHeader.css";
import Stack from "@mui/material/Stack";
import moment from "moment-timezone";
import "moment/locale/es";

export const PaymentDetailHeader = ({
  paymentOperationId,
  createdAt,
}: {
  paymentOperationId: string;
  createdAt: Date;
}) => {
  return (
    <>
      <Paper className="paper-container-detail" elevation={0}>
        <Stack
          gap="0.5rem"
          flexDirection="row"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography
            sx={{ width: "fit-content!important", flexShrink: 0, margin: 0 }}
            borderRadius={"8px"}
            padding={"0.3rem"}
            className="accordion-title"
          >
            <PaidOutlinedIcon />
            {"Operacion"}
          </Typography>
          <Stack
            gap="0.5rem"
            flexDirection="row"
            alignItems="center"
            flexWrap="wrap"
            flex="1"
            justifyContent="space-between"
            minWidth="15rem"
          >
            <div className="header-title"># {paymentOperationId}</div>
            <div className="header-title">
              Creada el{" "}
              {moment
                .tz(createdAt, "America/Argentina/Buenos_Aires")
                .format("DD MMMM YYYY, HH:mm:ss")}
            </div>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
