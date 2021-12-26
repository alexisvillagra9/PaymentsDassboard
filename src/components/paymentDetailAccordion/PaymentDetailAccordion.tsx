import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import React from "react";
import "./PaymentDetailAccordion.css";
import { EAccordionPanel } from "../../helpers/enums";
import { PaymentDetailItems } from "../paymentDetailItems/PaymentDetailItems";
import { IOperationItem } from "../../models/apis/wallet/operationItem";

export const PaymentDetailAccordion = ({
  panelId,
  title,
  handleChange,
  defaultExpanded,
  items,
  subtotal,
  transaction_amount,
}: {
  panelId: string;
  title: string;
  handleChange: (panel: string) => any;
  defaultExpanded: boolean;
  items?: IOperationItem[];
  subtotal?: number;
  transaction_amount?: number;
}) => {
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
          <Typography sx={{ width: "100%", flexShrink: 0 }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {panelId === EAccordionPanel.items && (
            <PaymentDetailItems
              items={items || []}
              subtotal={subtotal || 0}
              transaction_amount={transaction_amount || 0}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
