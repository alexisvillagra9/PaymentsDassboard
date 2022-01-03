import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import moment from "moment-timezone";
import "moment/locale/es";
import React from "react";
import { IPaymentOperationAttempt } from "../../models/apis/wallet/paymentOperationAttempts";
import { IStatusResult } from "../../models/apis/wallet/statusResult";

export const PaymentDetailAttempts = ({
  attempts,
  loading,
}: {
  attempts: IPaymentOperationAttempt[];
  loading: boolean;
}) => {
  const iconSelect = () => {
    return <>{<RestoreOutlinedIcon />}</>;
  };

  const ItemStatus = ({
    status,
    createdAt,
  }: {
    status: IStatusResult;
    createdAt: Date;
  }) => {
    const { description, code } = status;
    return (
      <>
        <ListItemAvatar>
          <Avatar className="payment-avatar">{iconSelect()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${description}`}
          secondary={moment
            .tz(createdAt, "America/Argentina/Buenos_Aires")
            .format("DD MMMM YYYY, HH:mm:ss")}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: "medium",
            letterSpacing: 0,
            color: "var(--color-primary)",
          }}
        />
        <Stack gap="1rem" flexDirection="row" alignItems="center">
          {code === "OK" ? (
            <CheckCircleOutlinedIcon color="success" fontSize="large" />
          ) : (
            <CancelOutlinedIcon color="error" fontSize="large" />
          )}
        </Stack>
      </>
    );
  };

  const skeletonList = (
    <>
      <List
        className="skeleton-container"
        sx={{ width: "100%", padding: 0, bgcolor: "background.paper" }}
      >
        {[...Array(1)].map((x, idx) => (
          <ListItem divider={false} key={idx}>
            <Skeleton
              animation="wave"
              variant="circular"
              className="skeleton-payment-avatar"
            />
            <ListItemText
              primary={
                <Skeleton
                  animation="wave"
                  height={"1.8rem"}
                  className="skeleton-title"
                />
              }
              secondary={
                <Skeleton
                  animation="wave"
                  height={"1.3rem"}
                  className="skeleton-subtitle"
                />
              }
            />
            <Skeleton
              animation="wave"
              variant="circular"
              width={"2rem"}
              height={"2rem"}
            />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {loading ? (
        <>{skeletonList}</>
      ) : (
        <>
          {attempts.length ? (
            <>
              <List>
                {attempts.map((att, idx) => {
                  const {
                    _id,
                    createdAt,
                    result: {
                      status: statusAttempt = { code: "", description: "" },
                    } = {},
                  } = att;
                  return (
                    <ListItem key={_id} divider={idx < attempts.length - 1}>
                      <ItemStatus
                        status={statusAttempt}
                        createdAt={createdAt}
                      ></ItemStatus>
                    </ListItem>
                  );
                })}
              </List>
            </>
          ) : (
            <>No existen intentos para esta operacion actualmente</>
          )}
        </>
      )}
    </>
  );
};
