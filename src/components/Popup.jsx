import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";

export default function Popup({ title, openModal, setOpenModal, children }) {
  return (
    <>
      <Dialog
        open={openModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ backgroundColor: "#0f1118" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h2>{title}</h2>
            <IconButton
              color="error"
              aria-label="close"
              component="span"
              onClick={() => setOpenModal(false)}
            >
              <MdOutlineCancel />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#0f1118" }}>
          <div className="mt-2">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
