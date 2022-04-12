import React, { useEffect } from "react";

import MenuAppBar from "../components/MenuAppBar/MenuAppBar";
import SideBar from "../components/Sidebar/SideBar";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import {
  getClients,
  getUsers,
  getInvoices,
  useAuthState,
  useAuthDispatch,
} from "../Context";

function HomePage() {
  const dispatch = useAuthDispatch();
  useEffect(async () => {
    const clients = await getClients(dispatch);
    await getUsers(dispatch);
    await getInvoices(dispatch);
  }, []);
  const test = useAuthState();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);

  const toggleSidebar = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  return (
    <>
      <MenuAppBar handleBtnClick={toggleSidebar} />
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      {/* <Container maxWidth="sm">
      </Container> */}
      <Grid
        container
        // spacing={3}
        // direction="column"
        // alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid container item justifyContent="center" alignItems="center" xs={6}>
          <Card
            sx={{ width: "80%", height: "50%" }}
            // sx={{ minWidth: 275 }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Metricas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid container item justifyContent="center" alignItems="center" xs={6}>
          <Card
            sx={{ width: "80%", height: "50%" }}
            // sx={{ minWidth: 275 }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Comisiones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;
