import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

/**
 * FavoriteButton component for adding/removing recipes from favorites.
 *
 * @component
 * @example
 * // Example usage of FavoriteButton component
 * <FavoriteButton />
 */
export default function FavoriteButton() {
  const [open, setOpen] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  /**
   * Handles the click event on the FavoriteButton.
   *
   * @function
   * @inner
   */
  const handleClickOpen = () => {
    if (buttonClicked) {
      setOpen(true);
    } else {
      setButtonClicked(true);
    }
  };

  /**
   * Closes the confirmation dialog.
   *
   * @function
   * @inner
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handles the removal of the recipe from favorites.
   *
   * @function
   * @inner
   */
  const handleRemoveFromFavorites = () => {
    setButtonClicked(false);
    setOpen(true);
  };

  /**
   * Handles the addition of the recipe to favorites.
   *
   * @function
   * @inner
   */
  const handleAddToFavorites = () => {
    setButtonClicked(true);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {buttonClicked ? "Remove from Favorites" : "Add to Favorites"}
        {buttonClicked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            {/* SVG path for "Remove from Favorites" */}
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {/* SVG path for "Add to Favorites" */}
          </svg>
        )}
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
          <Button
            onClick={
              buttonClicked ? handleRemoveFromFavorites : handleAddToFavorites
            }
            autoFocus
          >
            {buttonClicked ? "Agree" : "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
