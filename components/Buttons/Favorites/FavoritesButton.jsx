import { useState } from "react";
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

  const handleRemoveFromFavorites = () => {
    setButtonClicked(false);
    setOpen(true);
  };

  const handleAddToFavorites = () => {
    setButtonClicked(true);
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        {buttonClicked ? "Add to Favorites" : "Remove from Favorites"}
        {/* {buttonClicked ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='w-6 h-6'
          >
            <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
          </svg>
        )} */}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Delete from Favorites?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {buttonClicked
              ? "We are sad to see this recipe isn't your favorite anymore. Are you sure you want to remove it from your favorites list?"
              : "Add this recipe to your favorites?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {buttonClicked ? "Disagree" : "No"}
          </Button>
          {/* <Button
            onClick={
              buttonClicked ? handleRemoveFromFavorites : handleAddToFavorites
            }
            autoFocus
          >
            {buttonClicked ? "Agree" : "Yes"}
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
