import React from "react";
import IconButton from "@mui/material/IconButton";
import { Edit as EditIcon } from "@mui/icons-material";

const EditButton = ({ params, editIconHandler }) => {
  return (
    <div>
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => editIconHandler(params)}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default EditButton;
