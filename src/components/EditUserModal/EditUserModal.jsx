import { Box, Button, Modal, TextField, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../configs/Configs";
import { appContext } from "../../AppContext";

const EditUserModal = ({ openModal, setOpenModal, selectedRow }) => {
  const { refreshUserList } = useContext(appContext);
  const matches = useMediaQuery("(min-width:600px)");

  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    setUserObj(selectedRow);
  }, [selectedRow]);

  const handleSaveEdits = async () => {
    await api.put(`/users/${selectedRow?.id}`, { ...userObj }).catch((err) => {
      console.log(err);
    });
    setOpenModal(false);
    refreshUserList();
  };

  const styles = {
    modalBox: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 400,
      bgcolor: "background.paper",
      border: "1px solid #031333",
      boxShadow: 24,
      p: 4,
      borderRadius: "5px",
    },
    modalBoxForMobileScreens: {
      margin: "auto",
      maxWidth: window.innerWidth,
      bgcolor: "background.paper",
      border: "1px solid #031333",
      boxShadow: 24,
      p: 4,
      borderRadius: "5px",
    },
    inputs: {
      marginBottom: "15px",
    },
    modalBtn: {
      m: "15px 15px 0px 0px",
    },
  };
  const editForm = (
    <Box sx={matches ? styles.modalBox : styles.modalBoxForMobileScreens}>
      <TextField
        fullWidth
        label="Name"
        variant="standard"
        value={userObj?.name}
        onChange={(e) => setUserObj({ ...userObj, name: e.target.value })}
        sx={styles.inputs}
      />
      <TextField
        fullWidth
        label="Email"
        variant="standard"
        value={userObj?.email}
        onChange={(e) => setUserObj({ ...userObj, email: e.target.value })}
        sx={styles.inputs}
      />
      <TextField
        fullWidth
        label="Age"
        variant="standard"
        sx={styles.inputs}
        value={userObj?.age}
        onChange={(e) => setUserObj({ ...userObj, age: e.target.value })}
      />
      <TextField
        fullWidth
        label="Phone Number"
        variant="standard"
        sx={styles.inputs}
        value={userObj?.phoneNumber}
        onChange={(e) =>
          setUserObj({ ...userObj, phoneNumber: e.target.value })
        }
      />
      <Button sx={styles.modalBtn} color="primary" onClick={handleSaveEdits}>
        Save Changes
      </Button>
      <Button
        sx={styles.modalBtn}
        color="error"
        onClick={() => setOpenModal(false)}
      >
        Cancel
      </Button>
    </Box>
  );
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      {editForm}
    </Modal>
  );
};

export default EditUserModal;
