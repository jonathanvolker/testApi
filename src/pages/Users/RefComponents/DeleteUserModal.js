import React,{ useState , useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Dialog } from "@material-ui/core";
import { deleteUserById , useAuthState, useAuthDispatch} from "../../../Context";
import { makeStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import  {useStylesForm } from "../useStylesForm";
import {alertEditUser} from "../Alerts/Alerts";

const EditUsererModal =({ index , showModal, imageLink })=>{
    const history = useHistory();
    const clientsDetail = useAuthState();
    
    const classesForm = useStylesForm();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
           /*  let response = await deleteUserById( index  );
            console.log(response);
            if (response.result) {
                alert("Usuario eliminado")
                 history.push("/home");
            }else{
                alert("Error al eliminar el usuario")
            }
            ; */
            alertEditUser({deleteUserById , index  , history})

          } catch (error) {
            // console.log(error);
          }

    };

return(
      <>
        <Dialog disableEnforceFocus  open >
                    <form className={classesForm.root} onSubmit={handleSubmit}>
                        <h3>Esta seguro que desea eliminar el usuario?</h3>

                        <div className={classesForm.div_button} >
                            <Button className={classesForm.button} variant="contained" onClick={showModal}>
                                Cancelar
                            </Button>
                            <Button className={classesForm.button}  type="submit" variant="contained" color="primary">
                                Eliminar
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </>


)    

}

export default EditUsererModal;