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
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { AuthContext } from "../../context/auth/authContext";
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
  // const { paymentOperationsFiltered: payOpsFilteredContext } =
  //   useContext(GeneralContext);

  const getGroupedDate = () => {
    // const data = [].sort((a, b) => {
    //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // });
    const data: any[] = [];

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
        borderColor: "#009ee3",
      },
    ],
  };

  function graphHover(e: any, array: any) {
    console.log(e);
    console.log(array);
    if (array.length > 0) {
      if (e.target) e.target.style.cursor = "pointer";
    } else {
      if (e.target) e.target.style.cursor = "";
    }
  }

  const options = {
    // scales: {
    //   x: {
    //     min: "2021-11-07 00:00:00",
    //   },
    // },
    onHover: graphHover,
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
