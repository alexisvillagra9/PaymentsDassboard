import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React from "react";
import { EAccordionPanel } from "../../helpers/enums";
import { IOperationItem } from "../../models/apis/wallet/operationItem";
import { IPartnerOperation } from "../../models/apis/wallet/partnerOperation";
import { IResult } from "../../models/apis/wallet/result";
import { PaymentDetailAttempts } from "../paymentDetailAttempts/PaymentDetailAttempts";
import { PaymentDetailItems } from "../paymentDetailItems/PaymentDetailItems";
import { PaymentDetailPartner } from "../paymentDetailPartner/PaymentDetailPartner";
import { PaymentDetailStatus } from "../paymentDetailStatus/PaymentDetailStatus";
import "./PaymentDetailAccordion.css";
import { IPaymentOperationAttempt } from "../../models/apis/wallet/paymentOperationAttempts";

export const PaymentDetailAccordion = ({
  panelId,
  title,
  handleChange,
  defaultExpanded,
  items,
  subtotal,
  transaction_amount,
  partner,
  result,
  attempts,
  attemptsLoading,
}: {
  panelId: string;
  title: string;
  handleChange: (panel: string) => any;
  defaultExpanded: boolean;
  items?: IOperationItem[];
  subtotal?: number;
  transaction_amount?: number;
  partner?: IPartnerOperation;
  result?: IResult;
  attempts?: IPaymentOperationAttempt[];
  attemptsLoading?: boolean;
}) => {
  const getHeaderIcon = () => {
    let iconTag = null;
    if (panelId === "items") iconTag = <FormatListBulletedOutlinedIcon />;
    if (panelId === "partner") iconTag = <AccountCircleOutlinedIcon />;
    if (panelId === "status") iconTag = <PublishedWithChangesOutlinedIcon />;
    if (panelId === "attempts") iconTag = <ReplayOutlinedIcon />;
    return iconTag;
  };
  return (
    <div>
      <Accordion
        className="accordion-container"
        elevation={0}
        defaultExpanded={defaultExpanded}
        onChange={handleChange(panelId)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon htmlColor="var(--color-primary)" />}
          aria-controls={`${panelId}bh-content`}
          id={`${panelId}bh-header`}
        >
          <Typography
            sx={{ width: "fit-content", flexShrink: 0 }}
            borderRadius={"8px"}
            padding={"0.3rem"}
            className="accordion-title"
          >
            {getHeaderIcon()}
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {panelId === EAccordionPanel.items && (
            <PaymentDetailItems
              items={items || []}
              subtotal={subtotal || 0}
              transaction_amount={transaction_amount || 0}
            />
          )}
          {panelId === EAccordionPanel.partner && (
            <PaymentDetailPartner partner={partner} />
          )}
          {panelId === EAccordionPanel.status && (
            <PaymentDetailStatus result={result} />
          )}

          {panelId === EAccordionPanel.attempts && (
            <PaymentDetailAttempts
              attempts={attempts || []}
              loading={attemptsLoading || false}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
