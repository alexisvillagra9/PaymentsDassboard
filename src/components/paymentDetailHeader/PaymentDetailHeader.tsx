import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Dialog, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import moment from "moment-timezone";
import "moment/locale/es";
import { useState } from "react";
import { FaRegHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  operationStatusColor,
  paymentStatusColor,
  paymentStatusDesc,
} from "../../helpers/payments";
import "./PaymentDetailHeader.css";

export const PaymentDetailHeader = ({
  paymentOperationId,
  paymentReference,
  statusDescription,
  resultPaymentCode,
  statusCode,
  createdAt,
}: {
  paymentOperationId: string;
  paymentReference: string;
  statusDescription: string;
  resultPaymentCode: string | undefined;
  statusCode: string;
  createdAt: Date;
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(paymentReference);
    setCopied(true);
  };
  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Cambiar Estado</DialogTitle>
        <Stack></Stack>
      </Dialog>
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
              {paymentReference && (
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
              )}
              <Stack
                direction="row"
                gap="0.5rem"
                flexWrap="wrap"
                justifyContent="flex-end"
              >
                {/* <Chip label="Small" size="small" /> */}
                <Chip
                  className="status-chip"
                  label={statusDescription}
                  size="small"
                  icon={<PaidOutlinedIcon style={{ color: "unset" }} />}
                  sx={operationStatusColor(statusCode)}
                />
                {resultPaymentCode && (
                  <Chip
                    className="status-chip"
                    label={paymentStatusDesc(resultPaymentCode)}
                    size="small"
                    sx={paymentStatusColor(resultPaymentCode)}
                    icon={<FaRegHandshake style={{ color: "unset" }} />}
                  />
                )}
              </Stack>
            </div>
            <div className="header-title">
              Creada el{" "}
              {moment
                .tz(createdAt, "America/Argentina/Buenos_Aires")
                .format("DD MMMM YYYY, HH:mm:ss")}
            </div>
          </Stack>
          <Stack></Stack>
          <Stack flexDirection="row">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => handleClickOpen()}
            >
              <SettingsOutlinedIcon htmlColor="var(--color-primary)" />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosOutlinedIcon htmlColor="var(--color-primary)" />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
