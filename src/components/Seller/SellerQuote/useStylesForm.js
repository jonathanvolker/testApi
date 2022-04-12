
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
    buttonR:{
       padding: '0.5rem',
       marginLeft: '0.5rem',
    },
    buttonL:{
        padding: '0.5rem',
        marginRight: '0.5rem',
     },
    buttonsContainer:{
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button:{
        padding: '0.5rem',
    }

    
});


export const useStyles = makeStyles({
   /*  root: {
        display: 'flex',
        flexDirection:"row",

    } */
})