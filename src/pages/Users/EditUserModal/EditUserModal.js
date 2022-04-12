import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Dialog } from "@material-ui/core";
import {
  modifyUserBy_id,
  uploadImgBy_id,
  useAuthState,
  useAuthDispatch,
  getUsers
} from "../../../Context";
import { useStylesForm } from "../useStylesForm";
import MenuItem from "@mui/material/MenuItem";
import { Button, Grid, TextField, Stack, Box, FormControl, InputLabel, Select } from "@mui/material";
import { alertEditUser, alertPassword } from "../Alerts/Alerts";

const EditUserModal = ({ index, showModal, chargeImg }) => {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const clientsDetail = useAuthState();
  const filteredClient = clientsDetail.usersList.filter(
    (user) => user._id === index
  );
  const styles = useStylesForm();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState({});
  const [isImage, setIsImage] = useState(false);
  const [imageState, setImageState] = useState(false);


  useEffect(() => {
    setName(filteredClient[0].name);
    setRole(filteredClient[0].role);
    setEmail(filteredClient[0].email);
    if (chargeImg.length > 2) {
      // console.log(chargeImg)
      setIsImage(true)
    } else {
      setIsImage(false)
    }

  }, [chargeImg, clientsDetail, image]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: name,
      role: role,
      email: email,
      password: password,
    };
    // console.log(image)
    var data = new FormData();
    data.append('image', image)
    try {
      if (password.length < 11) {
        return alertPassword();
      }
      alertEditUser({ modifyUserBy_id, index, body, history, uploadImgBy_id, data, setImage });
    } catch (error) {
      // console.log(error);
    }
  };
  const handleImgSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0])
    setImage(e.target.files[0])
    setImageState(true)
  }


  return (
    <>
      <Dialog disableEnforceFocus open >
        <Stack
          className={styles.title}
          sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", justifyContent: "center" }}
        >
          Editar usuario existente
        </Stack>
        <Box>
          <Grid container justifyContent="center" sx={{ flexDirection: "row" }} >
            <Grid item sx={{ padding: "1rem" }}   >
              <TextField
                spacing={{ xs: 8 }}
                label="Nombre"
                variant="filled"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item sx={{ padding: "1rem" }} >
              <TextField
                spacing={{ xs: 8 }}
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
            <Grid item  justifyContent="center"  xs={10} md={5}>
             
                <FormControl fullWidth >
                  <InputLabel id="test-select-label">Rol</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="role"
                    label="Rol"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                  >
                    <MenuItem value={"salesman"}>Salesman</MenuItem>
                    <MenuItem value={"administrator"}>Administrator</MenuItem>
                    <MenuItem value={"director"}>Director</MenuItem>
                    <MenuItem value={"developer"}>Developer</MenuItem>
                  </Select>
                </FormControl>
              
            </Grid>

            <Grid item sx={{ padding: "1rem" }}  >
              <TextField
                spacing={{ xs: 8 }}
                label="Password"
                variant="filled"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item container sx={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }} >
            {isImage && imageState ?
              <>
              <Grid item justifyContent="center" sx={{flexDirection: "row" }} xs={10} md={5}>
                <Stack
                  className={styles.imageStack}
                  sx={{  justifyContent: "center", alignItems: "center", justifyContent: "center" }}
                >
                  Imagen pre-cargada.
                </Stack>
                <Stack
                  className={styles.imageStack}
                  sx={{  justifyContent: "center", alignItems: "center", justifyContent: "center" }}
                >
                  Guardar para salvar cambios.
                </Stack>
                </Grid>

                <Grid item justifyContent="center"  sx={{flexDirection: "row"}} xs={10} md={5}>
                <Button
                  component="label"
                >
                   Cambiar imagen.
                  <input
                    name="image"
                    type="file"
                    hidden
                    onChange={e => handleImgSubmit(e)}
                  />
                </Button>
                </Grid>
                </>
               :

              isImage ?
              <>
                <Grid item container sx={{ padding: "1rem", justifyContent: "center", alignItems: "center", flexDirection:"row"}}>
                 
                  <Grid item justifyContent="center" xs={10} md={5}>
                  <img src={chargeImg} alt="img" width="47px" height="47px" className={styles.img} />
                  </Grid>
                 
                  <Grid item justifyContent="center" xs={10} md={5}>
                  <Button
                    component="label"
                  >
                    Cambiar imagen.
                    <input
                      name="image"
                      type="file"
                      hidden
                      onChange={e => handleImgSubmit(e)}
                    />
                  </Button>
                  </Grid>

                </Grid> </>
                 :
                imageState ?
                  <Grid sx={{ padding: "1rem", justifyContent: "center", alignItems: "center" }}>
                    <Stack
                      className={styles.imageStack}
                      sx={{ flexDirection: "row", justifyContent: "center", alignItems: "center", justifyContent: "center" }}
                    >
                      Imagen pre-cargada.
                    </Stack>
                    <Stack
                      className={styles.imageStack}
                      sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", justifyContent: "center" }}
                    >
                      Guardar para salvar cambios.
                    </Stack>
                    <Button
                      component="label"
                    >
                      Cambiar imagen.
                      <input
                        name="image"
                        type="file"
                        hidden
                        onChange={e => handleImgSubmit(e)}
                      />
                    </Button>
                  </Grid>
                  :
                  <Grid sx={{ padding: "1rem", justifyContent: "space-betwean", alignItems: "center" }}>
                    <Button
                      component="label"
                    >
                      Subir imagen.
                      <input
                        name="image"
                        type="file"
                        hidden
                        onChange={e => handleImgSubmit(e)}
                      />
                    </Button>
                  </Grid>





            }
          </Grid>
          <Stack className={styles.buttonsContainer} sx={{ flexDirection: "row", justifyContent: "space-around" }} >
            <Grid className={styles.buttonL} >
              <Button onClick={showModal}>
                Cancelar
              </Button>
            </Grid>
            <Grid className={styles.buttonR} >
              <Button
                disabled_={!name.length < 0 || !role.length < 0 || !email.length < 0 || !password.length < 0}
                onClick={handleSubmit}>
                Guardar
              </Button>
            </Grid>
          </Stack>

        </Box>
      </Dialog>
    </>
  );
};

export default EditUserModal;
