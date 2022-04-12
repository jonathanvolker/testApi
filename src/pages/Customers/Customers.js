import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import Grid from "@mui/material/Grid"
import AddCustomerModal from "./AddCustomerModal";
import { DataGrid } from '@mui/x-data-grid';
import { useAuthState, useAuthDispatch, deleteClientById, getClients } from "../../Context";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { AddCircle as AddIcon } from "@mui/icons-material";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";
import SideBar from "../../components/Sidebar/SideBar";
import swal from 'sweetalert';
import AddButton from './AddButton';
import TextField from "@mui/material/TextField";

import "./Customers.css";



const DeleteButton = ({ params }) => {
    let history = useHistory();
    return (
        <div
            onClick={() => {
                swal({
                    title: "Eliminar el cliente?",
                    buttons: ["Cancelar", "Aceptar"],
                }).
                    then((result) => {
                        console.log(result)
                        if (result) {
                            deleteClientById(params.id, history);
                            swal({ text: "El cliente ha sido eliminado", icon: "success", timmer: "500" });
                            // setInterval(window.location.reload(), 1500)
                        }
                        else {
                            swal({ text: "El cliente no ha sido eliminado" });
                        }
                    })
            }}
        >
            <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}

            >
                <DeleteIcon index={params.id} />
            </IconButton>
        </div>
    );
};

const EditButton = ({ params }) => {

    //console.log(history);
    //console.log(rowData);
    return (
        <div>
            <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}

            >
                <EditIcon index={params.id} />
            </IconButton>
        </div>
    );
};
const columns = [
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'razonSocial', headerName: 'Razon Social', width: 200 },
    { field: 'mainAddress', headerName: 'Direccion', width: 200 },
    { field: 'telephone', headerName: 'Telefono', width: 200 },
    { field: 'lba', headerName: 'L.A.B', width: 200 },
    { field: 'conditions', headerName: 'Condiciones', width: 200 },
    {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                // <Grid
                //     sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", justifyContent: "center" }}
                // >
                <div className="icons-container">
                    <EditButton params={params} />
                    <DeleteButton params={params} />
                </div>
                // </Grid>
            );
        },
    },
];


export default function Customers() {

    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [clients, setClients] = useState([]);
    const history = useHistory();
    const clientsDetail = useAuthState();
    const [sidebarVisible, setSidebarVisible] = React.useState(false);
    const dispatch = useAuthDispatch();

    const showModal = () => {
        if (!modal) {
            setModal(true)
        } else {
            setModal(false)
        }
    }

    const toggleSidebar = () => {
        if (!sidebarVisible) {
            setSidebarVisible(true);
        } else {
            setSidebarVisible(false);
        }
    };

    const changeSearch = async (e) => {
        e.preventDefault();
        let filteredClient = clients.filter(client =>
            client.rfc.includes(e.target.value) ||
            client.name.includes(e.target.value.toUpperCase() || e.target.value.toLowerCase()));
        setClients(filteredClient)
        setSearch(e.target.value)
    }
    useEffect(() => {
        getClients(dispatch)
    }, [])
    useEffect(() => {
        if (!search.length) {
            setClients(clientsDetail.customers)
            // console.log(clientsDetail)
        }
    }, [search || clientsDetail]);

    return (
        <>
            <MenuAppBar handleBtnClick={toggleSidebar} />
            <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

            <div className="page-container">
                <div className="page-title">Modulo de clientes</div>

                <Grid
                    container
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}
                >
                    <Grid
                        item
                        id="general-options-container"
                        sx={{ flexDirection: "row", marginBottom: 4 }}
                    >
                        <AddButton showModal={showModal} />
                        <TextField
                            spacing={{ xs: 8 }}
                            inputProps={{ "aria-label": "buscar nombre" }}
                            placeholder="Buscar nombre o email"
                            value={search}
                            onChange={changeSearch}
                        />
                    </Grid>
                </Grid>

                <div style={{ height: 500, width: "100%" }}>
                    <DataGrid
                        rows={clients}
                        columns={columns}
                        pemailSize={5}
                        rowsPerPemailOptions={[4]}
                        getRowId={(row) => row._id}
                        sx={{
                            '.MuiDataGrid-columnSeparator': {
                                display: 'none',
                            },
                            height: 400,
                            width: "100%",
                            border: "1px solid black"
                        }}
                    />
                </div>
            </div>
            {modal ?
                <AddCustomerModal showModal={showModal} />
                : null}
        </>
    );
}