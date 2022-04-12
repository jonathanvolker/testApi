import React from "react";
import { useState, useEffect } from "react";
import EditUserModal from "../EditUserModal/EditUserModal";
import { FormControlLabel, IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@mui/material/Grid";

const CustomerIcons = ({
  index,
  imageLink,
  isImage,
  setIsImage,
  checkAddOrEdit,
}) => {
  const [chargeImg, setChargeImg] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (typeof imageLink == "string") {
      setChargeImg(imageLink);
    }
  }, [modal, imageLink, checkAddOrEdit]);

  const showModal = () => {
    setModal(true);
    // setCheckAddOrEdit(false);
  };

  const closeModal = () => {
    setModal(false);
    // setCheckAddOrEdit(false);
  };

  return (
    <FormControlLabel
      control={
        <>
          <div onClick={showModal}>
            <Grid item xs={2}>
              <EditIcon style={{ color: "90A4AE" }} />
            </Grid>
          </div>
        </>
      }
    />
  );
};
export default CustomerIcons;
