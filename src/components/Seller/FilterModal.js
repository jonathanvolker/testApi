import React from "react";
/* import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar"; */
import { blue } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
/* import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText"; */
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, DialogContent } from "@mui/material";

const FilterModal = (props) => {
  const emails = ["username@gmail.com", "user02@gmail.com"];

  const { onClose, selectedValue, open, columnName, filterValues } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleFilterApply = () => {
    console.log("filtering");
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Filtrando Columna {columnName}</DialogTitle>
      <DialogContent>
        <FormGroup>
          {filterValues.map((filterValue, id) => (
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={filterValue}
              key={id.toString()}
            />
          ))}
        </FormGroup>
        <Button onClick={() => handleFilterApply()} variant="contained">
          Aplicar Filtro
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
