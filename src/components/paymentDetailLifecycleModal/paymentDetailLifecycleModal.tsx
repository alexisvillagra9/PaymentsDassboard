import { Chip, Modal, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { IPaymentOperationLifecycle } from "../../models/apis/wallet/paymentOperationLifecycle";
import { getIconAndColorLifecycle } from "../../helpers/payments";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import "./paymentDetailLifecycleModal.css";

export const PaymentDetailLifecycleModal = ({
  lifecylce,
  open,
  handleClose,
}: {
  lifecylce: IPaymentOperationLifecycle | null;
  open: boolean;
  handleClose: () => any;
}) => {
  const {
    type: { code: type_code = "", description: type_description = "" } = {},
    description,
  } = lifecylce || {};
  const [, color] = getIconAndColorLifecycle(type_code);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        className="box-container"
        maxWidth="30rem"
        maxHeight="90%"
        padding="1rem"
        gap="0.5rem"
        flexDirection="column"
        color="var(--color-primary)"
      >
        <Stack flex="1">
          <Chip
            className="status-chip"
            label={type_description}
            size="small"
            icon={
              <ArrowDropDownCircleOutlinedIcon
                style={{
                  color: `var(--color-${color})`,
                  textAlign: "left",
                }}
              />
            }
            sx={{
              backgroundColor: `var(--background-${color}) !important`,
              color: `var(--color-${color}) !important`,
              justifyContent: "start",
            }}
          />
        </Stack>
        <Stack
          flex="1"
          style={{
            backgroundColor: "var(--background-default)",
            color: "var(--color-default)",
            padding: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          {description}
        </Stack>
      </Box>
    </Modal>
  );
};
