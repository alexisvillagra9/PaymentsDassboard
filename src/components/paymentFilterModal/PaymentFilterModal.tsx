import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import "./PaymentFilterModal.css";

export const PaymentFilterModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => any;
}) => {
  return (
    <Modal open={open} onClose={handleClose} sx={{ display: "flex" }}>
      <Box className="box-container">
        <>En construccion</>
      </Box>
    </Modal>
  );
};
