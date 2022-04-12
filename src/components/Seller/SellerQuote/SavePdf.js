import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import MyDocTable from "../../PDF/MyDocTable";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
import { useHistory, useParams } from "react-router-dom";
import { deleteInvoiceById, useAuthState } from "../../../Context";
import { alertDeleteQuote, alertPrintPdf } from "./Alerts";
import { savePdfTable } from "./ConceptMethods";

export const SavePdf = ({ rowData }) => {
    let history = useHistory();
    const check = true;
    const invoiceValues = rowData.row;
    const tableData = rowData.row.concepts;
    // console.log(rowData);
    return (
      <div
        onClick={() => {
          savePdfTable(rowData, check);
        }}
      > 
        <IconButton
          size="medium"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          {
            <PDFDownloadLink
              document={
                <MyDocTable
                  tableData={tableData}
                  invoiceValues={invoiceValues}
                  check={check}
                />
              }
              fileName={
                invoiceValues.title
                  ? invoiceValues.title.replace(/\s/g, "_").trim()
                  : "generic" + ".pdf"
              }
            >
              {({ blob, url, loading, error }) =>
                loading ? "Cargando documento..." : "PDF"
              }
            </PDFDownloadLink>
          }
        </IconButton>
      </div>
    );
  };

  