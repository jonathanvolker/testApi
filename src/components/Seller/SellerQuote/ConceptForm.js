import React, { useEffect } from "react";
import { Button, Box, TextField } from "@mui/material";
import { alertConcepts } from "./Alerts";
import PriceForm from "./PriceForm";

const ConceptForm = ({
  conceptValues,
  handleConceptInputChange,
  numberErrorMessage,
  priceErrorMessage,
  addConcept,
  isOpen,
  setOpen,
  handleInvoiceInputChange,
}) => {
  useEffect(() => {
  }
  , [conceptValues]);

  return (
    <>
      <Box mb={2}>
        <TextField
          label={"Descripcion"}
          value={conceptValues.description.toUpperCase()}
          name="description" //IMPORTANT
          onChange={handleConceptInputChange}
          // onBlur={handleConceptInputChange}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          label={"SubDescripcion"}
          value={conceptValues.subdescription.toUpperCase()}
          name="subdescription" //IMPORTANT
          onChange={handleConceptInputChange}
          // onBlur={handleConceptInputChange}
          fullWidth
        />
      </Box>
      <Box mb={2}>
        <TextField
          error={isNaN(conceptValues.quantity)}
          helperText={numberErrorMessage}
          label={"Cantidad"}
          value={conceptValues.quantity}
          name="quantity" //IMPORTANT
          onChange={handleConceptInputChange}
          // onBlur={handleConceptInputChange}
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Box>

      <Box mb={2}>
        <TextField
          error={isNaN(conceptValues.price)}
          helperText={priceErrorMessage}
          label={"Precio Unitario"}
          value={conceptValues.price}
          name="price" //IMPORTANT
          onChange={handleConceptInputChange}
          // onBlur={handleConceptInputChange}
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Box>
      {!isOpen ? (
        <>
          <Box mb={2}>
            {/* <TextField
              error={isNaN(conceptValues.price)}
              helperText={priceErrorMessage}
              label={"Precio Unitario"}
              value={conceptValues.price}
              name="price" //IMPORTANT
              fullWidth
              disabled={true}
            /> */}

            <Button onClick={() => setOpen(true)} disabled>
              Calcular precio
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box mb={2}>
            <TextField
              error={isNaN(conceptValues.price)}
              helperText={priceErrorMessage}
              label={"Precio Unitario"}
              value={conceptValues.price}
              name="price" //IMPORTANT
              fullWidth
              disabled={true}
            />

            <Button onClick={() => setOpen(true)}>Calcular precio</Button>
          </Box>
          <PriceForm
            handleInvoiceInputChange={handleInvoiceInputChange}
            handleConceptInputChange={handleConceptInputChange}
            isOpen={isOpen}
            setOpen={setOpen}
          />
        </>
      )}

      <Box mb={2}>
        <TextField
          label={"Número de parte"}
          value={conceptValues.partNumber.toUpperCase()}
          name="partNumber" //IMPORTANT
          onChange={handleConceptInputChange}
          // onBlur={handleConceptInputChange}
          fullWidth
        />
      </Box>
      <Button fullWidth onClick={() => alertConcepts({ addConcept })}>
        Agregar
      </Button>
    </>
  );
};

export default ConceptForm;
