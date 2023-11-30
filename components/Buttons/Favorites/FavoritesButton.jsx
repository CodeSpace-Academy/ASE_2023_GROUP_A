import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FavoriteButton() {
  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClickOpen = () => {
    if (buttonClicked) {
      setOpen(true);
    } else {
      setButtonClicked(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonClicked ? "Add to Favorites" : "Remove from Favorites"}

      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete from Favorites?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {buttonClicked
              ? "We are sad to see this recipe isn't your favorite anymore. Are you sure you want to remove it from your favorites list?"
              : "Add this recipe to your favorites?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {buttonClicked ? "Disagree" : "No"}
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
