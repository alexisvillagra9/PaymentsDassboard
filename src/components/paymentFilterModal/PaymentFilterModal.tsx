import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
} from "chart.js";
import _ from "lodash";
import moment from "moment-timezone";
import "moment/locale/es";
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { AuthContext } from "../../context/auth/authContext";
import { GeneralContext } from "../../context/general/generalContext";
import "./PaymentFilterModal.css";
export const PaymentFilterModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => any;
}) => {
  Chart.register(
    LineController,
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement
  );

  const {
    user: { username },
  } = useContext(AuthContext);
  const { paymentOperationsFiltered: payOpsFilteredContext } =
    useContext(GeneralContext);

  const getGroupedDate = () => {
    const data = (payOpsFilteredContext || []).sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    let groupedResults = _(data)
      .map((item) => {
        return {
          date: moment(new Date(item.createdAt)).format("DD/MM/YYYY"),
          transaction_amount: item.transaction_amount,
        };
      })
      .groupBy("date")
      .mapValues((item) => {
        const summed = _.sumBy(item, "transaction_amount");
        return summed;
      })
      .value();

    const groupedResultsArray = Object.keys(groupedResults).map((key) => {
      return { x: key, y: groupedResults[key] };
    });
    return groupedResultsArray;
  };

  const data = {
    datasets: [
      {
        data: getGroupedDate(),
      },
    ],
  };
  const options = {
    // scales: {
    //   x: {
    //     min: "2021-11-07 00:00:00",
    //   },
    // },
    maintainAspectRatio: false,
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: "flex" }}>
      <Box className="box-container">
        <Stack flex="1">
          {username === "admin" && <Line data={data} options={options} />}
        </Stack>
      </Box>
    </Modal>
  );
};
