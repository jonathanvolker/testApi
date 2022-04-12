import React from "react";
import { Edit as EditIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";

const EditButton = ({ rowData, onEditClick }) => {
  let history = useHistory();
  //console.log(history);
  //console.log(rowData);
  return (
    <div
      onClick={() => {
        onEditClick(this, rowData, history);
      }}
    >
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default EditButton;
