import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IPaymentOperation } from "../../models/apis/wallet/paymentOperation";
import { PaymentListItem } from "../paymentListItem/PaymentListItem";
import "./PaymentList.css";
import { GeneralContext } from "../../context/general/generalContext";

export const PaymentList = ({
  paymentOperations,
}: {
  paymentOperations: IPaymentOperation[];
}) => {
  const [paymentOperationsShow, setPaymentOperationsShow] = useState<
    IPaymentOperation[]
  >([]);
  const navigate = useNavigate();
  const { actualPage: actualPageContext, setActualPage: setActualPageContext } =
    useContext(GeneralContext);

  useEffect(() => {
    const end = actualPageContext * 10;
    const start = end - 10;
    setPaymentOperationsShow(paymentOperations.slice(start, end));
  }, [actualPageContext, paymentOperations]);

  const handlePaymentDetail = (paymentOperationId: string) => {
    navigate(`/payment-detail/${paymentOperationId}`);
  };

  const getCount = (pageSize: number) => {
    let count = Math.ceil(paymentOperations.length / pageSize);
    return count;
  };

  const handlePagination = (event: ChangeEvent<any>, pageSelect: number) => {
    setActualPageContext(pageSelect);
  };

  return (
    <>
      <div className="payment-list-container">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {paymentOperationsShow.map(
            (payOp: IPaymentOperation, idx: number) => {
              const {
                _id,
                origin,
                status,
                partner,
                result = {},
                createdAt,
                transaction_amount,
              } = payOp;
              return (
                <>
                  <ListItem
                    key={idx.toString()}
                    divider={idx + 1 < paymentOperationsShow.length}
                    disablePadding
                  >
                    <ListItemButton onClick={() => handlePaymentDetail(_id)}>
                      <PaymentListItem
                        origin={origin}
                        status={status}
                        partner={partner}
                        result={result}
                        transaction_amount={transaction_amount}
                        createdAt={createdAt}
                        key={_id}
                      ></PaymentListItem>
                    </ListItemButton>
                  </ListItem>
                </>
              );
            }
          )}
        </List>
      </div>
      <Stack alignItems="center">
        <Pagination
          count={getCount(10)}
          // color="primary"
          page={actualPageContext}
          onChange={handlePagination}
        />
      </Stack>
    </>
  );
};
