import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Grid, TextField, Stack, Box } from "@mui/material";
import { Dialog } from "@material-ui/core";
import { addNewClient } from "../../Context";
import { useStylesForm } from "./useStylesForm";
import { alertAddClient } from "./Alerts";

const AddCustomerModal = ({ showModal }) => {
  const history = useHistory();
  const styles = useStylesForm();
  const [name, setName] = useState("");
  const [rfc, setRfc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [colony, setColony] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [conditions, setConditions] = useState("");
  const [currency, setCurrency] = useState("");
  const [lba, setLba] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      razonSocial:razonSocial,
      telephone:telephone,
      rfc: rfc,
      mainAddress: mainAddress,
      colony: colony,
      city: city,
      country: country,
      postalCode: postalCode,
      conditions: conditions,
      currency: currency,
      lba: lba,
    };
    try {
      alertAddClient({ addNewClient, newUser, history });
    } catch (error) {
      // console.log(error);
    }
    showModal();
  };

  return (
    <>
      <Dialog disableEnforceFocus open>
        <Stack
          className={styles.title}
          sx={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Agregar nuevo cliente
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" sx={{ flexDirection: "row" }}
          >
            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Nombre"
                variant="filled"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Razon Social"
                variant="filled"
                required
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Direccion"
                variant="filled"
                required
                value={mainAddress}
                onChange={(e) => setMainAddress(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Telefono"
                variant="filled"
                required
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Condiciones"
                variant="filled"
                required
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Moneda"
                variant="filled"
                required
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="L.A.B."
                variant="filled"
                required
                value={lba}
                onChange={(e) => setLba(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="RFC"
                variant="filled"
                required
                value={rfc}
                onChange={(e) => setRfc(e.target.value)}
              />
            </Grid>

            {/* <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Ciudad"
                variant="filled"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Colonia"
                variant="filled"
                required
                value={colony}
                onChange={(e) => setColony(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Pais"
                variant="filled"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                 spacing={{ xs: 8 }}
                label="Codigo postal"
                variant="filled"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
         */}
          </Grid>
          <Stack className={styles.buttonsContainer}  sx={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Grid className={styles.buttonL}>
              <Button onClick={showModal}>Cancelar</Button>
            </Grid>
            <Grid className={styles.buttonR}>
              <Button
                onClick={handleSubmit}
                disabled={
                  !name.length > 0 ||
                  !mainAddress.length > 0 ||
                  !conditions.length > 0 ||
                  !currency.length > 0 ||
                  !lba.length > 0
                }
              >
                Agregar
              </Button>
            </Grid>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
};

export default AddCustomerModal;
