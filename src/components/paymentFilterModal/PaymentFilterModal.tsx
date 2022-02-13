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
import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { GeneralContext } from "../../context/general/generalContext";
import "./PaymentFilterModal.css";
import { AuthContext } from "../../context/auth/authContext";

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

  const data = {
    datasets: [
      {
        data: [
          {
            x: "2021-11-06 23:39:30",
            y: 50,
          },
          {
            x: "2021-11-07 01:00:28",
            y: 60,
          },
          {
            x: "2021-11-07 09:00:28",
            y: 20,
          },
        ],
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
