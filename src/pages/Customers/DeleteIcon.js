import React , {useState} from 'react';
import { FormControlLabel } from '@material-ui/core';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2px',
   
    },
    
});

const DeleteIcon = ({ index }) => {
    const [modal, setModal] = useState(false);
    
    const showModal = () => {
        if (!modal) {
            setModal(true)
        } else {
            setModal(false)
        }
    }
    
    const classes = useStyles();

    const handleDelete = (e) => {
        // console.log('delete'+ index);
        showModal()
    }
 return <FormControlLabel 
        className={classes.root}
        control={
            <>
               
                <div color="secondary" aria-label="add an alarm"  onClick={(e)=>handleDelete(e.target.value)} >
                    <Grid item xs={2}>
                        <DeleteTwoToneIcon style={{ color: "90A4AE" }} />
                    </Grid>
                </div>
                { /* modal ? 
                <DeleteCustomerModal showModal={showModal} index={index} />
                : null  */}
            </>
        }
    />
};
export default DeleteIcon;