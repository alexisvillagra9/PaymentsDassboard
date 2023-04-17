import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { FaRegHandshake } from "react-icons/fa";
import { GrCycle } from "react-icons/gr";
import { EAccordionPanel } from "../../helpers/enums";
import { IPaymentDetailAccordion } from "../../models/app/payment/paymentDetailAccordion";
import { PaymentDetailAttempts } from "../paymentDetailAttempts/PaymentDetailAttempts";
import { PaymentDetailItems } from "../paymentDetailItems/PaymentDetailItems";
import { PaymentDetailLifecycle } from "../paymentDetailLifecycle/paymentDetailLifecycle";
import { PaymentDetailMercadopago } from "../paymentDetailMercadopago/PaymentDetailMercadopago";
import { PaymentDetailPartner } from "../paymentDetailPartner/PaymentDetailPartner";
import { PaymentDetailStatus } from "../paymentDetailStatus/PaymentDetailStatus";
import "./PaymentDetailAccordion.css";
import { PaymentDetailMacro } from "../paymentDetailMacro/paymentDetailMacro";

export const PaymentDetailAccordion = ({
  panelId,
  title,
  handleChange,
  defaultExpanded,
  items,
  subtotal,
  transaction_amount,
  pointOfSale,
  partner,
  result,
  attempts,
  attemptsLoading,
  lifecycle,
  lifecycleLoading,
  paymentMercadopago,
  paymentsMacro,
}: IPaymentDetailAccordion) => {
  const getEqualAmounts = () => {
    return (
      (transaction_amount || 0) ===
      (paymentMercadopago?.transaction_amount || 0)
    );
  };

  const getHeaderIcon = () => {
    let iconTag = null;
    if (panelId === EAccordionPanel.items)
      iconTag = <FormatListBulletedOutlinedIcon />;
    if (panelId === EAccordionPanel.partner)
      iconTag = <AccountCircleOutlinedIcon />;
    if (panelId === EAccordionPanel.status)
      iconTag = <PublishedWithChangesOutlinedIcon />;
    if (panelId === EAccordionPanel.attempts) iconTag = <ReplayOutlinedIcon />;
    if (panelId === EAccordionPanel.lifecycle)
      iconTag = <GrCycle size="1.4rem" />;
    if (panelId === EAccordionPanel.mercadopago)
      iconTag = <FaRegHandshake size="1.5rem" />;
    if (panelId === EAccordionPanel.macropago)
      iconTag = <FaRegHandshake size="1.5rem" />;
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
            className="accordion-title-acc"
          >
            {getHeaderIcon()}
            {title}
          </Typography>
          {pointOfSale ? (
            <Typography
              sx={{
                width: "fit-content",
                flexShrink: 0,
                backgroundColor: "var(--background-info) !important",
                color: "var(--color-info) !important",
              }}
              borderRadius={"8px"}
              padding={"0.3rem"}
              marginLeft={"0.5rem"}
              className="accordion-title-acc"
            >
              <StoreOutlinedIcon />
              {pointOfSale.description}
            </Typography>
          ) : null}
          {panelId === EAccordionPanel.mercadopago && (
            <Typography
              sx={{ width: "fit-content", flexShrink: 0 }}
              borderRadius="8px"
              padding="0.3rem"
              marginLeft="0.5rem"
              className={`accordion-title-acc accordion-title-acc-${
                getEqualAmounts() ? "success" : "error"
              }`}
            >
              {getEqualAmounts() ? (
                <CheckCircleOutlineOutlinedIcon />
              ) : (
                <CancelOutlinedIcon />
              )}
              {getEqualAmounts() ? "Conciliado" : "No Conciliado"}
            </Typography>
          )}
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

          {panelId === EAccordionPanel.lifecycle && (
            <PaymentDetailLifecycle
              lifecycle={lifecycle || []}
              loading={lifecycleLoading || false}
            />
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
          {panelId === EAccordionPanel.mercadopago && (
            <PaymentDetailMercadopago payment={paymentMercadopago || null} />
          )}
          {panelId === EAccordionPanel.macropago &&
            paymentsMacro?.map((pay) => (
              <PaymentDetailMacro payment={pay || null} />
            ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
