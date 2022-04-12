import React from 'react';
import {useState} from "react"
import EditCustomerModal from "./EditCustomerModal"
import { FormControlLabel } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

const CustomerIcons = ({ index }) => {
    const [modal, setModal] = useState(false);
    
    const showModal = () => {
        if (!modal) {
            setModal(true)
        } else {
            setModal(false)
        }
    }
    const handleEditClient = (e) => {
        showModal()
        // console.log(index)
    }

    return <FormControlLabel
        control={
            <>
                <div color="secondary" aria-label="add an alarm" onClick={handleEditClient} >
                    <Grid item xs={2}>
                        <EditIcon style={{ color: "90A4AE" }} />
                    </Grid>
                </div>
                { modal ? 
                <EditCustomerModal showModal={showModal} index={index} />
                : null }
            </>
        }
    />
};
export default CustomerIcons;