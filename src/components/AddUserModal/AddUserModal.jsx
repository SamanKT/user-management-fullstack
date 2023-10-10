import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Modal,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ageApi, api } from "../../configs/Configs";
import { appContext } from "../../AppContext";
import CloseIcon from "@mui/icons-material/Close";

const AddUserModal = ({ openModal, setOpenModal }) => {
  const { refreshUserList } = useContext(appContext);

  const matches = useMediaQuery("(min-width:600px)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAddUser = () => {
    setOpenAlert(false);

    if (!name || !email || !phoneNumber) {
      setAlertMessage("Please fill all the fields");
      setOpenAlert(true);
      return;
    }
    if (email && !email.includes("@")) {
      setAlertMessage("The email is not valid");
      setOpenAlert(true);
      return;
    }
    if (phoneNumber && (phoneNumber.length !== 10 || isNaN(phoneNumber))) {
      setAlertMessage("The phone number should be 10 digits and only numbers");
      setOpenAlert(true);
      return;
    }
    api
      .post("/users", { name, email, age, phoneNumber })
      .then((res) => {
        refreshUserList();
        setOpenModal(false);
      })

      .catch((err) => {});
  };

  const handleGetAge = async () => {
    if (!name) return;
    setLoading(true);
    const res = await ageApi.get(`/?name=${name}`);
    setAge(res.data.age);
    setLoading(false);
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
    loadingBox: {
      zIndex: 100,
      background: "rgba(255,255,255,0.5)",
      width: 400,
      height: 300,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const addForm = (
    <Box sx={matches ? styles.modalBox : styles.modalBoxForMobileScreens}>
      {loading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TextField
            fullWidth
            label="Name"
            variant="standard"
            sx={styles.inputs}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleGetAge}
            required
          />
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            sx={styles.inputs}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Age"
            variant="standard"
            disabled
            sx={styles.inputs}
            value={age}
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="standard"
            sx={styles.inputs}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </>
      )}
      <Button sx={styles.modalBtn} color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <Button
        sx={styles.modalBtn}
        color="error"
        onClick={() => setOpenModal(false)}
      >
        Cancel
      </Button>
      <Collapse in={openAlert}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="error"
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </Box>
  );

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      >
        {addForm}
      </Modal>
    </>
  );
};

export default AddUserModal;
