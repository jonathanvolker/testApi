import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { deleteInvoiceById } from "../../../Context";
import { alertDeleteQuote } from "../SellerQuote/Alerts";

const DeleteButton = ({ rowData }) => {
  const history = useHistory();

  return (
    <div
      onClick={() => {
        // console.log("deleting", rowData);
        try {
          alertDeleteQuote({ deleteInvoiceById, rowData, history });
        } catch (error) {
          // console.log(error);
        }
      }}
    >
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DeleteButton;
