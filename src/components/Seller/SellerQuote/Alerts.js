import swal from 'sweetalert';


export const alertConcepts = ({ addConcept }) => {
  // console.log(addConcept);
  swal({
    title: "Agregar concepto?",
    buttons: ["Cancelar", "Aceptar"],
  }).
    then((result) => {
      // console.log(result)
      if (result) {
        swal("Concepto agregado", {
          buttons: false,
          icon: "success",
          timer: 1000,
        })
        addConcept();
      }
      else {
        swal("No se agrego agregado", {
          buttons: false,
          icon: "error",
          timer: 1000,
        });
      }
    })
};

export const alertSaveQuote = ({ saveQuote }) => {
  //console.log(saveQuote);
  swal({
    title: "Generar nueva cotizacion?",
    buttons: ["Cancelar", "Aceptar"],
  }).
    then((result) => {
      // console.log(result)
      if (result) {
        swal("Cotizacion agregada", {
          buttons: false,
          icon: "success",
          timer: 1000,
        })
        saveQuote();
      }
      else {
        swal("Fallo la cotizacion", {
          buttons: false,
          icon: "error",
          timer: 1000,
        });
      }
    })
}

export const alertDeleteQuote = ({ deleteInvoiceById, rowData, history }) => {
  swal({
    title: "Eliminar cotizacion?",
    buttons: ["Cancelar", "Aceptar"],
  }).
    then((result) => {
      // console.log(result)
      if (result) {
        swal("Cotizacion eliminada", {
          buttons: false,
          icon: "success",
          timer: 1000,
        })
        deleteInvoiceById(rowData.id);
        setInterval(window.location.reload(), 1500)
      }
      else {
        swal("Fallo al eliminar cotizacion", {
          buttons: false,
          icon: "error",
          timer: 1000,
        });
      }

    })
}

export const alertSavePdf = ({ saveQuote }) => {
  //console.log(saveQuote);
  saveQuote();
}

