import swal from 'sweetalert';

export const alertAddClient = ({ addNewClient , newUser , history})=>{
  // console.log(addNewClient);
  // console.log(newUser);

  swal({
    title: "Agregar cliente nuevo?",
    buttons: ["Cancelar", "Aceptar"],
   }).
   then((result) => {
    //  console.log(result)
    if (result) {
      addNewClient(newUser , history);
      swal({text: "El cliente ha sido agregado",icon: "success",timmer:"500" });
      //setInterval(window.location.reload(), 1500)
    }
    else{
      swal({text: "El cliente no ha sido agregado"});
    }
  })
};

export const alertEditClient = ({ modifyClientBy_id , index, body, history })=>{

    // console.log(body);
    // console.log(index)  
    swal({
      title: "Editar el cliente?",
      buttons: ["Cancelar", "Aceptar"],
     }).
     then((result) => {
      //  console.log(result)
      if (result) {
        modifyClientBy_id(index , body, history);
        swal({text: "El cliente ha sido modificado",icon: "success",timmer:"500" });
        //setInterval(window.location.reload(), 1500)
      }
      else{
        swal({text: "El cliente no ha sido modificado"});
      }
    })
  };

export const alertDeleteClient = ({ deleteClientById , index, history })=>{
      swal({
          title: "Eliminar el cliente?",
          buttons: ["Cancelar", "Aceptar"],
          }).
          then((result) => {
          // console.log(result)
          if (result) {
            deleteClientById(index, history);
            swal({text: "El cliente ha sido eliminado",icon: "success",timmer:"500" });
             // setInterval(window.location.reload(), 1500)
          }
          else{
              swal({text: "El cliente no ha sido eliminado"});
          }
          })
}

