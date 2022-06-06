import { Avatar, ListItemAvatar } from "@mui/material";
import moment from "moment-timezone";
import "moment/locale/es";
import { useState } from "react";
import Xarrow, { Xwrapper } from "react-xarrows";
import { getIconAndColorLifecycle } from "../../helpers/payments";
import { IPaymentOperationLifecycle } from "../../models/apis/wallet/paymentOperationLifecycle";
import { PaymentDetailLifecycleModal } from "../paymentDetailLifecycleModal/paymentDetailLifecycleModal";
import "./paymentDetailLifecycle.css";

export const PaymentDetailLifecycle = ({
  lifecycle,
  loading,
}: {
  lifecycle: IPaymentOperationLifecycle[];
  loading: boolean;
}) => {
  const [lifecycleSelected, setLifecycleSelected] =
    useState<IPaymentOperationLifecycle | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {!loading && (
        <Xwrapper>
          <div className="archer-container">
            {lifecycle.map((lf, idx) => {
              const {
                _id,
                type: { code: type_code, description: type_description },
                date,
              } = lf;
              const [icon, color] = getIconAndColorLifecycle(type_code);

              return (
                <>
                  <ListItemAvatar
                    key={`item-${_id}`}
                    id={`${idx}`}
                    style={{
                      marginTop: idx % 2 ? "2rem" : "",
                    }}
                    className="archer-avatar"
                    onClick={() => {
                      setLifecycleSelected(lf);
                      handleOpen();
                    }}
                  >
                    <Avatar
                      className="payment-avatar"
                      sx={{
                        margin: "0",
                        color: `var(--color-${color})!important`,
                        backgroundColor: `var(--background-${color})!important`,
                        borderColor: `var(--color-${color})!important`,
                      }}
                    >
                      {icon}
                    </Avatar>
                    <div className="archer-detail">
                      <div className="archer-dateil-title">
                        {type_description}
                      </div>
                      {moment
                        .tz(date, "America/Argentina/Buenos_Aires")
                        .format("DD MMMM YYYY, HH:mm:ss")}
                    </div>
                  </ListItemAvatar>

                  {idx + 1 === lifecycle.length ? null : (
                    <Xarrow
                      key={`xarrow-${_id}`}
                      start={`${idx}`}
                      end={`${idx + 1}`}
                      strokeWidth={1}
                      // startAnchor="bottom"
                      // endAnchor="top"
                      lineColor="var(--color-primary)"
                      color="var(--color-primary)"
                      dashness={{
                        strokeLen: 10,
                        nonStrokeLen: 15,
                        animation: -2,
                      }}
                    />
                  )}
                </>
              );
            })}
          </div>
        </Xwrapper>
      )}
      <PaymentDetailLifecycleModal
        lifecylce={lifecycleSelected}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
