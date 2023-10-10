import { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { Box, Button, Typography } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import loadingAnimation from "./assets/lottie/loading.json";
import welcomeAnimation from "./assets/lottie/welcome.json";
import UserDataGrid from "./components/UserDataGrid/UserDataGrid";
import { useSpring, animated } from "@react-spring/web";
import AddUserModal from "./components/AddUserModal/AddUserModal";
import { appContext } from "./AppContext";
import developerAnimation from "./assets/lottie/developer-animation.json";

function App() {
  const { allUsers, refreshUserList } = useContext(appContext);
  const [loading, setLoading] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const loadingRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [stylesForReactIcon, springApiForReactIcon] = useSpring(() => ({
    from: { y: 0 },

    config: { duration: 1000 },
  }));
  const [stylesForWelcomeTxt, springApiForWelcomeTxt] = useSpring(() => ({
    from: { opacity: 0 },
    config: { duration: 1000 },
    onRest: () => {
      setTimeout(() => {
        setWelcome(false);
        titleBoxSpringApi.start({ opacity: 1 });
      }, 1000);
    },
  }));
  const [titleSpringStyle, titleBoxSpringApi] = useSpring(() => ({
    from: { opacity: 0 },
    config: { duration: 1000 },
  }));

  useEffect(() => {
    if (allUsers) setLoading(false);
  }, [allUsers]);
  const MUIstyles = {
    container: {
      display: "flex",
      flex: 1,
      justifyContent: "center",
      flexdirection: "column",
      alignItems: "center",

      background: "none",
    },
    mainPageBox: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: "600px",
    },

    datagrid: {
      bgcolor: "background.paper",
      padding: "20px",
    },

    titleBox: {
      display: "flex",
      justifyContent: "space-between",
      bgcolor: "background.paper",
      padding: "20px",
      mb: "20px",
      borderRadius: "5px",
    },
    welcomeBox: {
      position: "absolute",
      margin: "auto",
    },
  };
  return (
    <Box component="div" sx={MUIstyles.container}>
      {welcome ? (
        <Box sx={MUIstyles.welcomeBox}>
          <animated.div style={stylesForReactIcon}>
            <Player
              src={welcomeAnimation}
              autoplay
              onEvent={(event) => {
                if (event === "load") {
                  setTimeout(() => {
                    loadingRef.current.pause();
                    springApiForReactIcon.start({ y: -20 });
                    springApiForWelcomeTxt.start({ opacity: 1 });
                  }, 4000);
                }
              }}
              style={{ width: "50%" }}
              ref={loadingRef}
            />
          </animated.div>

          <animated.div style={stylesForWelcomeTxt}>
            <Typography variant="h6">
              A demo application by: <b>@SamanKT</b>
            </Typography>
          </animated.div>
        </Box>
      ) : loading ? (
        <Player
          src={loadingAnimation}
          autoplay
          loop
          style={{ width: "40%" }}
          ref={loadingRef}
        />
      ) : (
        <Box sx={MUIstyles.mainPageBox}>
          <Box>
            <animated.div style={titleSpringStyle}>
              <Box sx={MUIstyles.titleBox}>
                <Typography variant="h5" className="tracking-in-expand">
                  User Management Application
                </Typography>
                <Button onClick={() => setOpenModal(true)}>Add User</Button>
              </Box>
            </animated.div>
            <UserDataGrid sx={MUIstyles.datagrid} data={allUsers} />
            <AddUserModal openModal={openModal} setOpenModal={setOpenModal} />
          </Box>
          <Box
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.open("https://saman-khataei.web.app/", "_blank")
            }
          >
            <Player
              src={developerAnimation}
              autoplay
              loop
              style={{
                width: "10%",
                marginTop: "40px",
              }}
            />
            <Typography variant="body2" sx={{ marginTop: -2 }}>
              Developed by @SamanKT
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
