import React from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import IconButton from "@mui/material/IconButton";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { deleteUserById } from "../../../Context";

const DeleteButton = ({ params }) => {
  let history = useHistory();
  return (
    <div
      onClick={() => {
        // console.log("deleting", params);
        swal({
          title: "Eliminar el usuario?",
          buttons: ["Cancelar", "Aceptar"],
        }).then((result) => {
          // console.log(result);
          if (result) {
            deleteUserById(params.id, history);
            swal({
              text: "El usuario ha sido eliminado",
              icon: "success",
              timmer: "500",
              buttons: false,
            });
           // setInterval(window.location.reload(), 1500);
          } else {
            swal({ text: "El usuario no ha sido eliminado" });
          }
        });
      }}
    >
      <IconButton
        size="medium"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <DeleteTwoToneIcon style={{ color: "90A4AE" }} />
        {/* <DeleteIcon index={params.id} /> */}
      </IconButton>
    </div>
  );
};

export default DeleteButton;
