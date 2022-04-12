import React from "react";
import { IconButton } from "@material-ui/core";
import { AddCircle as AddIcon } from "@mui/icons-material";

const AddButton = ({ showModal }) => {
  return (
    <IconButton
      onClick={showModal}
      size="medium"
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddButton;
