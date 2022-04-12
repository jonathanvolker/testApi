
import { makeStyles } from "@material-ui/styles";

export const useStylesForm = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
   
    },
    title:{
        fontSize:"20px",
        textAlign:"center",
        marginBottom: "4%",
        marginTop:"4%",
        fontWeight: "700",
    },
    textField:{
        fontSize:"20px",
        textAlign:"center",
        marginBottom: "4%",
        marginTop:"4%",
        fontWeight: "700",
    },

    buttonR: {
        padding: "0.5rem",
      },
      buttonL: {
        padding: "0.5rem",
      },
      buttonsContainer:{
        flexDirection: "row", 
        justifyContent: "space-around",
        '@media(minWidth: 780px)' : {
            flexDirection: "column", 
            justifyContent: "space-around",
        }
}
    
});


export const useStyles = makeStyles({
   /*  root: {
        display: 'flex',
        flexDirection:"row",

    } */
})