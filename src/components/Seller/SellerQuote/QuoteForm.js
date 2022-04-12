import React, { useEffect, useState } from "react";
import { Button, Grid, InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import { COMISSIONSTATUS, STATUS, WORK } from "../../../Config/constants";
import { getClient, useAuthDispatch, useAuthState } from "../../../Context";
import { formatInvoicesToPrint } from "../../../utils/formatters";
import {
  isAdmin,
  isAdminOrDirector,
  isSalesman,
  isDirector,
} from "../../../utils/roleDetectors";
import LazyDownloadPDFButton from "../LazyDownloadPDFButton";
import { alertSaveQuote } from "./Alerts";
import { saveQuote } from "./ConceptMethods";

const QuoteForm = ({
  invoiceValues,
  setInvoiceValues,
  handleInvoiceInputChange,
  tableData,
  clients,
  setOpen,
  isOpen,
  newInvoice,
}) => {
  const history = useHistory();
  let state = useAuthState();
  const dispatch = useAuthDispatch();
  const role = state?.role ?? "";
  useEffect(() => {
    // console.log(newInvoice);
    //console.log(invoiceValues);
  }, [
    invoiceValues.status,
    invoiceValues.work,
    invoiceValues.clients,
    invoiceValues.cost,
    state,
    isOpen,
  ]);

  const handleInvoiceChange = (newInvoiceValues) => {
    const newFormattedInvoiceValues = formatInvoicesToPrint(
      invoiceValues,
      newInvoiceValues
    );
    setInvoiceValues(newFormattedInvoiceValues);
  };

  const saveQuoteToDb = () => {
    // console.log("saving quote ", invoiceValues);
    invoiceValues.clientId = state.customer._id ?? "";

    saveQuote(
      invoiceValues,
      handleInvoiceChange,
      tableData,
      invoiceValues._id,
      setOpen,
      dispatch
    );
  };

  const getClientByID = (id) => {
    // console.log(id);
    getClient(dispatch, id);
  };

  // refresh customer info on refresh of site
  useEffect(() => {
    if (invoiceValues.client != "" && invoiceValues.client != undefined) {
      const selectedClient = clients.filter(
        (client) => client.name == invoiceValues.client
      );
      if (selectedClient.length > 0) {
        getClient(dispatch, selectedClient[0]._id);
      }
    }
  }, [invoiceValues.client, role]);

  return (
    <Grid container item justifyContent="center" xs={12} spacing={2}>
      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Fecha"}
          name="invoiceDate"
          value={invoiceValues.invoiceDate}
          fullWidth
          onChange={handleInvoiceInputChange}
          disabled
        />
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Titulo"}
          name="title"
          value={invoiceValues.title}
          fullWidth
          onChange={handleInvoiceInputChange}
          disabled={isAdmin(role)}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>

      {(isSalesman(role) || isDirector(role)) && (
        <Grid item justifyContent="center" xs={12} md={3}>
          <TextField
            label={"Usuario"}
            fullWidth
            name="user"
            value={invoiceValues.user}
            onChange={handleInvoiceInputChange}
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </Grid>
      )}

      {(isSalesman(role) || isDirector(role)) && (
        <Grid item justifyContent="center" xs={12} md={3}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="test-select-label">Trabajo</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={invoiceValues.work.toUpperCase()}
                label="Trabajo"
                name="work"
                onChange={(e) => {
                  handleInvoiceInputChange(e);
                }}
              >
                {WORK.map((w, id) => {
                  return (
                    <MenuItem
                      id={id}
                      name={"work"}
                      value={w.toUpperCase()}
                      key={"work-" + id.toString()}
                    >
                      {w.toUpperCase()}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
      )}
       {(isAdminOrDirector(role)) && (
        <Grid item justifyContent="center" xs={12} md={3}>
         <TextField
          id="date"
          type="date"
            label={"Fecha facturacion"}
            defaultValue={invoiceValues.billingDate}
            name="billingDate"
            onChange={handleInvoiceInputChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}     
          />
           
        </Grid>
      )}

       {(isAdminOrDirector(role)) && (
        <Grid item justifyContent="center" xs={12} md={3}>
         <TextField
           id="date"
           label="Fecha de pago"
           type="date"
           InputLabelProps={{
             shrink: true,
           }}         
           defaultValue={invoiceValues.paymmentDate}
            name="paymmentDate"
            onChange={handleInvoiceInputChange}
            fullWidth
          />
           
        </Grid>
      )}
       
      {(isSalesman(role) || isDirector(role)) && (
        <Grid item justifyContent="center" xs={12} md={3}>
          <TextField
            label={"Linea"}
            value={invoiceValues.line}
            name="line"
            onChange={handleInvoiceInputChange}
            fullWidth
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </Grid>
      )}

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"OC"}
          value={invoiceValues.OC}
          name="OC"
          onChange={handleInvoiceInputChange}
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"receptionNumber"}
          value={invoiceValues.receptionNumber}
          name="receptionNumber"
          onChange={handleInvoiceInputChange}
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Factura"}
          value={invoiceValues.factura}
          name="factura"
          onChange={handleInvoiceInputChange}
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
          disabled={!isAdminOrDirector(role)}
        />
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Remision"}
          value={invoiceValues.remissionNumber}
          name="remissionNumber"
          onChange={handleInvoiceInputChange}
          fullWidth
          inputProps={{ style: { textTransform: "uppercase" } }}
          disabled={!isAdminOrDirector(role)}
        />
      </Grid>

      {/* <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Ganancia"}
          value={invoiceValues.profit}
          name="profit"
          onChange={handleInvoiceInputChange}
          fullWidth
          disabled={!isAdminOrDirector(role)}
        />
      </Grid> */}

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Gastos"}
          value={invoiceValues.expenses}
          name="expenses"
          onChange={handleInvoiceInputChange}
          fullWidth
          disabled={isAdmin(role)}
        />
      </Grid>

      {/* <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Comisiones"}
          value={invoiceValues.comissions}
          name="comissions"
          onChange={handleInvoiceInputChange}
          fullWidth
          disabled={!isAdminOrDirector(role)}
        />
      </Grid> */}

      {(isSalesman(role) || isDirector(role)) && (
        <Grid item justifyContent="center" xs={12} md={3}>
          <TextField
            label={"Tiempo de entrega"}
            value={invoiceValues.deliveryTime}
            name="deliveryTime"
            onChange={handleInvoiceInputChange}
            inputProps={{ style: { textTransform: "uppercase" } }}
            fullWidth
          />
        </Grid>
      )}

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Precio de Venta"}
          name="cost"
          onChange={handleInvoiceInputChange}
          fullWidth
          value={invoiceValues.cost}
          disabled={true}
        />
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="test-select-label">Status</InputLabel>
            <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={invoiceValues.status.toUpperCase()}
              label="Status"
              name="status"
              onChange={(e) => {
                handleInvoiceInputChange(e);
              }}
              disabled={isAdmin(role)}
            >
              {STATUS.map((s, id) => {
                return (
                  <MenuItem
                    id={id}
                    name={"status"}
                    value={s.toUpperCase()}
                    key={"status-" + id.toString()}
                  >
                    {s.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="comissionStatus-label">Status Comision</InputLabel>
            <Select
              disabled={isSalesman(role)}
              required
              labelId="comissionStatus-select-label"
              id="comissionStatus-select"
              value={invoiceValues.comissionStatus.toUpperCase()}
              label="Status Comision"
              name="comissionStatus"
              onChange={(e) => {
                handleInvoiceInputChange(e);
              }}
            >
              {COMISSIONSTATUS.map((s, id) => {
                return (
                  <MenuItem
                    id={id}
                    name={"comissionStatus"}
                    value={s.toUpperCase()}
                    key={"comissionStatus-" + id.toString()}
                  >
                    {s.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="test-select-label">Cliente</InputLabel>
            <Select
              required
              disabled={isAdmin(role)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={invoiceValues.client.toUpperCase()}
              label="Cliente"
              name="client"
              onChange={(e) => {
                handleInvoiceInputChange(e);
              }}
            >
              {clients.map((c, id) => {
                return (
                  <MenuItem
                    id={c._id}
                    name={"client"}
                    value={c.name.toUpperCase()}
                    key={"client-" + id.toString()}
                    onClick={() => getClientByID(c._id)}
                  >
                    {c.name.toUpperCase()}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Email"}
          value={invoiceValues.email}
          onChange={handleInvoiceInputChange}
          name="email"
          fullWidth
        />
      </Grid>

      <Grid item justifyContent="center" xs={12} md={3}>
        <TextField
          label={"Vendedor"}
          value={invoiceValues.salesman}
          onChange={handleInvoiceInputChange}
          name="salesman"
          fullWidth
          disabled={true}
        />
      </Grid>

      <Grid container item justifyContent="center" xs={12} spacing={2}>
        <Button
          disabled={
            // !invoiceValues.OC ||
            // !invoiceValues.cost ||
            !invoiceValues.title ||
            !invoiceValues.work ||
            !invoiceValues.line ||
            !invoiceValues.status ||
            !invoiceValues.salesman ||
            !invoiceValues.client
          }
          onClick={() => alertSaveQuote({ saveQuote: saveQuoteToDb })}
        >
          Guardar Cotizacion
        </Button>
      </Grid>

      {!isAdmin(role) && isOpen && invoiceValues.invoiceNumber ? (
        <Grid container item justifyContent="center" xs={12} spacing={2}>
          <LazyDownloadPDFButton
            title={"Guardar PDF"}
            invoiceValues={invoiceValues}
            concepts={tableData}
          />
        </Grid>
      ) : (
        !isAdmin(role) && <Grid>Guardar para generar PDF ....</Grid>
      )}
    </Grid>
  );
};

export default QuoteForm;
