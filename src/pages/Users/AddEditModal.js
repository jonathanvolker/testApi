import React from "react";
import { useEffect, useState } from "react";
import { Dialog } from "@material-ui/core";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import {
  addNewUser,
  modifyUserBy_id,
  uploadImgBy_id,
  useAuthState,
} from "../../Context";
import {
  alertAddUser,
  alertEditUser,
  alertPassword,
  genericErrorAlert,
} from "./Alerts/Alerts";
import { useStylesForm } from "./useStylesForm";

const AddEditModal = ({ closeModal, index, chargeImg, isEdit }) => {
  // console.log("addedit modal loaded");
  const history = useHistory();
  const styles = useStylesForm();
  const clientsDetail = useAuthState();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({});
  /*const [isImage, setIsImage] = useState(false);
  const [imageState, setImageState] = useState(false);
  const [imageLink, setImageLink] = useState(false); */

  const filteredClient = clientsDetail.usersList.filter(
    (user) => user._id === index
  );

  useEffect(() => {
    if (isEdit) {
      //edit user
     // setImageLink(true);
      setName(filteredClient[0].name);
      setRole(filteredClient[0].role);
      setEmail(filteredClient[0].email);

      if (chargeImg && chargeImg.length > 2) {
        // console.log(chargeImg);
       // setIsImage(true);
      } else {
        //setIsImage(false);
      }
    }
  }, [chargeImg, clientsDetail, isEdit, filteredClient]);

  const handleSubmit = async (e) => {
    // console.log(`is editting ${isEdit}`);
    if (isEdit) {
      //edit user
      e.preventDefault();
      if (password.length < 8) {
        return alertPassword();
      }
      const body = {
        name: name,
        role: role,
        email: email,
        password: password,
      };
      //  console.log(body)
      var data = new FormData();
      data.append("image", image);
      try {
        alertEditUser({
          modifyUserBy_id,
          index,
          body,
          history,
          uploadImgBy_id,
          data,
         // setImageState,
        });
      } catch (error) {
        // console.log(error);
      }
    } else {
      //add user
      e.preventDefault();
      if (password.length < 8) {
        return alertPassword();
      }
      if (email.length < 5) {
        return genericErrorAlert(
          "El email es requerido",
          "Favor de ingresar un correo electrónico"
        );
      }
      if (name.length < 5) {
        // console.log(role);
        return genericErrorAlert(
          "El nombre es requerido",
          "Favor de ingresar un nombre"
        );
      }
      if (role.length < 5) {
        return genericErrorAlert(
          "El rol es requerido",
          "Favor de ingresar un rol"
        );
      }
      const newUser = {
        name: name,
        email: email,
        role: role,
        password: password,
      };
      try {
        alertAddUser({ addNewUser, newUser, history });
      } catch (error) {
        // console.log(error);
      }
    }
  };

/*   const handleImgSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageState(true);
  }; */

  return (
    <>
      <Dialog disableEnforceFocus open>
        <Stack
          className={styles.title}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Agregar o editar usuario
        </Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" sx={{ flexDirection: "row" }}>
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
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ flexDirection: "row" }}>
            <Grid
              sx={{ padding: "1rem" }}
              item
              justifyContent="center"
              xs={10}
              md={5}
            >
              <Box>
                <FormControl fullWidth spacing={{ xs: 10 }}>
                  <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                  <Select
                    sx={{ width: "100%" }}
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    value={role}
                    label="Rol"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value={"salesman"}>Salesman</MenuItem>
                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                    <MenuItem value={"director"}>Director</MenuItem>
                    <MenuItem value={"developer"}>Developer</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item sx={{ padding: "1rem" }}>
              <TextField
                spacing={{ xs: 8 }}
                label="Password"
                variant="filled"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            {/* 
            {imageLink ? (
              isImage && imageState ? (
                <>
                  <Grid
                    item
                    justifyContent="center"
                    sx={{ flexDirection: "row" }}
                    xs={10}
                    md={5}
                  >
                    <Stack
                      className={styles.imageStack}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Imagen pre-cargada.
                    </Stack>
                    <Stack
                      className={styles.imageStack}
                      sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Guardar para salvar cambios.
                    </Stack>
                  </Grid>

                  <Grid
                    item
                    justifyContent="center"
                    sx={{ flexDirection: "row" }}
                    xs={10}
                    md={5}
                  >
                    <Button component="label">
                      Cambiar imagen.
                      <input
                        name="image"
                        type="file"
                        hidden
                        onChange={(e) => handleImgSubmit(e)}
                      />
                    </Button>
                  </Grid>
                </>
              ) : isImage ? (
                <>
                  <Grid
                    item
                    container
                    sx={{
                      padding: "1rem",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Grid item justifyContent="center" xs={10} md={5}>
                      <img
                        src={chargeImg}
                        alt="img"
                        width="47px"
                        height="47px"
                        className={styles.img}
                      />
                    </Grid>

                    <Grid item justifyContent="center" xs={10} md={5}>
                      <Button component="label">
                        Cambiar imagen.
                        <input
                          name="image"
                          type="file"
                          hidden
                          onChange={(e) => handleImgSubmit(e)}
                        />
                      </Button>
                    </Grid>
                  </Grid>{" "}
                </>
              ) : imageState ? (
                <Grid
                  sx={{
                    padding: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Stack
                    className={styles.imageStack}
                    sx={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Imagen pre-cargada.
                  </Stack>
                  <Stack
                    className={styles.imageStack}
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Guardar para salvar cambios.
                  </Stack>
                  <Button component="label">
                    Cambiar imagen.
                    <input
                      name="image"
                      type="file"
                      hidden
                      onChange={(e) => handleImgSubmit(e)}
                    />
                  </Button>
                </Grid>
              ) : (
                <Grid
                  sx={{
                    padding: "1rem",
                    justifyContent: "space-betwean",
                    alignItems: "center",
                  }}
                >
                  <Button component="label">
                    Subir imagen.
                    <input
                      name="image"
                      type="file"
                      hidden
                      onChange={(e) => handleImgSubmit(e)}
                    />
                  </Button>
                </Grid>
              )
            ) : null} */}
          </Grid>
          <Stack
            className={styles.buttonsContainer}
            sx={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Grid className={styles.buttonL}>
              <Button onClick={closeModal}>Cancelar</Button>
            </Grid>
            <Grid className={styles.buttonR}>
              <Button onClick={(e) => handleSubmit(e)}
              disabled={!name || !email || !password || !role}
              >Agregar</Button>
            </Grid>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
};

export default AddEditModal;
