import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Dialog } from "@material-ui/core";
import { addNewUser } from "../../../Context";
import { Button, Grid, TextField, Stack, Box, FormControl, MenuItem,Select,InputLabel  } from "@mui/material";
import { useStylesForm } from "../useStylesForm"
import { alertAddUser } from "../Alerts/Alerts";



const AddUserModal = ({ showModal }) => {
    const history = useHistory();
    const styles = useStylesForm();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 11) {
            return alert("La contraseña debe tener al menos 10 caracteres")
        }
        const newUser = {
            name: name,
            email: email,
            role: role,
            password: password,
        }
        try {
            alertAddUser({ addNewUser, newUser, history })
        } catch (error) {
            // console.log(error);
        }
        showModal();
    };

    return (
        <>
            <Dialog disableEnforceFocus open >
                <Stack
                    className={styles.title}
                    sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", justifyContent: "center" }}
                >
                    Agregar nuevo usuario
                </Stack>
                <Box  >
                    <Grid container justifyContent="center" sx={{ flexDirection: "row" }} >
                        <Grid item sx={{ padding: "1rem" }}   >
                            <TextField
                                spacing={{ xs: 8 }}
                                label="Nombre"
                                variant="filled"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
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
                    <Grid item container  sx={{justifyContent:"center", alignItems:"center",  flexDirection: "row"}} >
                        <Grid item justifyContent="center"  xs={10}  md={5}>
                            <Box >
                                <FormControl fullWidth >
                                    <InputLabel id="test-select-label">Rol</InputLabel>
                                    <Select
                                        sx={{width:"100%"}}
                                        required
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="role"
                                        value={role}
                                        label="Rol"
                                        onChange={e => setRole(e.target.value)}
                                    >
                                        <MenuItem value={"salesman"}>Salesman</MenuItem>
                                        <MenuItem value={"administrator"}>Administrator</MenuItem>
                                        <MenuItem value={"director"}>Director</MenuItem>
                                        <MenuItem value={"developer"}>Developer</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
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
                    <Stack className={styles.buttonsContainer} sx={{ flexDirection: "row", justifyContent: "space-around" }} >
                        <Grid className={styles.buttonL} >
                            <Button  onClick={showModal}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid className={styles.buttonR} >
                            <Button  
                            disabled_={!name.length < 0 || !role.length < 0 || !email.length < 0 || !password.length < 0}
                            onClick={handleSubmit}>
                                Agregar
                            </Button>
                        </Grid>
                    </Stack>

                </Box>
            </Dialog>
        </>


    )

}

export default AddUserModal;