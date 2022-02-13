import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment-timezone";
import "moment/locale/es";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentDetailHeader.css";
import Button from "@mui/material/Button";

export const PaymentDetailHeader = ({
  paymentOperationId,
  paymentReference,
  createdAt,
}: {
  paymentOperationId: string;
  paymentReference: string;
  createdAt: Date;
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentReference);
    setCopied(true);
  };
  return (
    <>
      <Paper className="paper-container-detail" elevation={0}>
        <Stack
          gap="0.75rem"
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
            <div className="header-title">
              {`# ${paymentOperationId}`}
              <Button
                endIcon={
                  copied ? (
                    <CheckBoxOutlinedIcon
                      sx={{ fontSize: "0.85rem!important" }}
                    />
                  ) : (
                    <ContentCopyIcon sx={{ fontSize: "0.85rem!important" }} />
                  )
                }
                sx={{ padding: 0 }}
                onClick={handleCopy}
                onMouseOver={() => setCopied(false)}
              >
                {`MP#: ${paymentReference}`}
              </Button>
            </div>
            <div className="header-title">
              Creada el{" "}
              {moment
                .tz(createdAt, "America/Argentina/Buenos_Aires")
                .format("DD MMMM YYYY, HH:mm:ss")}
            </div>
          </Stack>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{ alignSelf: "baseline" }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosOutlinedIcon htmlColor="var(--color-primary)" />
          </IconButton>
        </Stack>
      </Paper>
    </>
  );
};
