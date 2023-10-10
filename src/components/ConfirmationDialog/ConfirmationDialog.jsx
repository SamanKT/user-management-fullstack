import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { api } from "../../configs/Configs";
import { appContext } from "../../AppContext";

const ConfirmationDialog = ({ open, setOpen, data }) => {
  const { refreshUserList } = useContext(appContext);
  const handleDeleteData = () => {
    api
      .delete(`/users/${data?.id}`)
      .then((res) => {
        refreshUserList();
      })

      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"User Data Removal Confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {data?.name}? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="info" autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button color="warning" onClick={handleDeleteData} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
