import React, { useEffect } from 'react';
import { Button, Grid, TextField, Stack, Box } from "@mui/material";
import { Dialog } from "@material-ui/core";
import { useStylesPriceForm } from "./useStylesPriceForm";
const PriceForm = ({ setOpen, handleConceptInputChange, handleInvoiceInputChange }) => {

    const styles = useStylesPriceForm();
    const handleClose = () => {
        setOpen(false);
    };
    const [selectedValue, setSelectedValue] = React.useState({
        mtls: 0,
        labor: 0,
        insumos: 0,
        comission: 0,
        factor: 0,
        gananciaSugerida: 0,
        totalPrice: 0
    });
    const calculateInsumos = () => {
        let insum = 0;
        const { mtls, labor } = selectedValue;
        insum = Number(mtls) * 0.1 + Number(labor) * 0.1;
        // console.log(insum)
        setSelectedValue({
            ...selectedValue,
            insumos: insum
        });

    }
    const calculateComissions = () => {
        const { mtls, labor, insumos } = selectedValue;
        let comission = 0;
        comission = Number(mtls) + Number(labor) - Number(insumos);
        let finalComission = comission * 0.03;
        // console.log(finalComission)
        setSelectedValue({
            ...selectedValue,
            comission: finalComission.toFixed(2)
        });
    }



    const handleChange = (event) => {
        switch (event.target.name) {
            case "mtls":
                setSelectedValue({
                    ...selectedValue,
                    [event.target.name]: event.target.value
                });
                break;
            case "labor":
                setSelectedValue({
                    ...selectedValue,
                    [event.target.name]: event.target.value
                });
                break;
            case "gananciaSugerida":
                setSelectedValue({
                    ...selectedValue,
                    [event.target.name]: event.target.value
                });
                break;
            case "factor":
                setSelectedValue({
                    ...selectedValue,
                    [event.target.name]: event.target.value
                });
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // console.log(selectedValue);
        /*       const toConsepts = {
                  name: "price",
                  value: selectedValue.totalPrice,
                  gananciaEstiomada: selectedValue.gananciaSugerida,
              }
              const toInvoice = {
                  name: "gananciaEstimada",
                  value: selectedValue.gananciaSugerida,
              }
              handleConceptInputChange(toConsepts);
      
              handleInvoiceInputChange(toInvoice) */


    };

    useEffect(() => {
        // console.log(selectedValue)

    }, [selectedValue.insumos || selectedValue.comission]);

    return (

        <>
            <Dialog disableEnforceFocus open>
                <Stack
                    className={styles.title}
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    Calculo de precio
                </Stack>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid
                        container
                        justifyContent="center"
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                style={{ padding: 9 }}
                                label={"Mtls"}
                                name="mtls"
                                value={selectedValue.mtls}
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        </Grid>

                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                style={{ padding: 9 }}
                                label={"Labor"}
                                name="labor"
                                value={selectedValue.labor}
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                style={{ padding: 9 }}
                                label={"Insumos"}
                                name="insumos"
                                value={selectedValue.insumos}
                                fullWidth
                                onChange={handleChange}
                                disabled={true}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                style={{ padding: 9 }}
                                label={"Comision vendedor"}
                                name="comission"
                                value={selectedValue.comission}
                                fullWidth
                                onChange={handleChange}
                                disabled={true}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                style={{ padding: 9 }}
                                label={"Factor"}
                                name="factor"
                                value={selectedValue.factor}
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <TextField
                                style={{ padding: 9 }}
                                label={"Ganancia Sugerida"}
                                name="gananciaSugerida"
                                value={selectedValue.gananciaSugerida}
                                fullWidth
                                onChange={handleChange}
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                            />
                        </Grid>
                        <Grid className={styles.buttonL}>
                            <Button onClick={calculateInsumos}
                                disabled={selectedValue.mtls.length === 0 || selectedValue.labor.length === 0}
                            >calcular insumos
                            </Button>
                        </Grid>
                        <Grid className={styles.buttonL}>
                            <Button onClick={calculateComissions}
                                disabled={selectedValue.mtls.length === 0 || selectedValue.labor.length === 0}
                            >calcular comisiones
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Stack
                         className={styles.price}
                        >
                            Precio final: ${selectedValue.totalPrice}
                        </Stack>
                    </Grid>
                    <Stack className={styles.buttonsContainer}>
                        <Grid className={styles.buttonL}>
                            <Button onClick={handleClose}>Cancelar</Button>
                        </Grid>
                        <Grid className={styles.buttonR}>
                            <Button
                                onClick={handleSubmit}
                            >
                                Agregar
                            </Button>
                        </Grid>
                    </Stack>
                </Box>
            </Dialog>
        </>
    )

}

export default PriceForm;