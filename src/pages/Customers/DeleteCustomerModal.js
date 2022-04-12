import React,{ useState , useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Dialog } from "@material-ui/core";
import { deleteClientById , useAuthState, useAuthDispatch} from "../../Context";
import { makeStyles } from "@material-ui/styles";
import Button from '@material-ui/core/Button';
import  {useStylesForm } from "./useStylesForm"
import {alertDeleteClient} from "./Alerts"

const DeleteCustomerModal =({ index , showModal})=>{
    const history = useHistory();
    const clientsDetail = useAuthState();
    
    const classesForm = useStylesForm();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
          try {
           /*  let response = await deleteClientById( index  );
            console.log(response);
            if (response.result) {
                alert("Cliente eliminado")
                 history.push("/home");
            }else{
                alert("Error al eliminar el cliente")
            }
            ; */
            alertDeleteClient({deleteClientById , index  , history})

          } catch (error) {
            // console.log(error);
          }

    };

return(
      <>
        <Dialog open >
                    <form className={classesForm.root} onSubmit={handleSubmit}>
                        <h3>Esta seguro que desea eliminar al cliente?</h3>

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

export default DeleteCustomerModal;