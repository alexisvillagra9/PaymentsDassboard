import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import React from "react";
import "./PaymenrFilters.css";

export const PaymentFilters = ({ total }: { total: number }) => {
  return (
    <>
      <Paper className="paper-container" elevation={0}>
        Total de Operaciones:{" "}
        <Chip label={total} size="small" className="chip-container" />
      </Paper>
    </>
  );
};
