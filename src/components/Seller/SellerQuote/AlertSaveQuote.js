import swal from "sweetalert";

export const alerSaveQuote = ({ saveQuoteToDb }) => {
  // console.log("=======from alert");
  // console.log(saveQuote);
  swal({
    title: "Generar nueva cotizacion?",
    buttons: ["Cancelar", "Aceptar"],
  }).then((result) => {
    // console.log(result);
    if (result) {
      saveQuoteToDb();
      swal({
        text: "La cotizacion ha sido agregada",
        icon: "success",
        timmer: "500",
      });
    } else {
      swal({ text: "La cotizacion no ha sido agregada" });
    }
  });
};
