import { Grid, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";
import SideBar from "../../components/Sidebar/SideBar";
import { getUsers, useAuthDispatch, useAuthState } from "../../Context";
import AddEditModal from "./AddEditModal";
import AddButton from "./Buttons/AddButton";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import "./UserPage.css";

export default function UserPage() {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [index, setIndex] = useState("");
  const history = useHistory();
  const usersDetail = useAuthState();
  const [sidebarVisible, setSidebarVisible] = React.useState(false);
  const dispatch = useAuthDispatch();

  const editIconHandler = (params) => {
    // console.log("editting");
    setModal(!0);
    setIsEdit(!0);
    setIndex(params.id);
    setImageLink(params.row.imageLink);
  };

  const changeSearch = async (e) => {
    e.preventDefault();
    let filteredUsers = users.filter(
      (user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers(filteredUsers);
    setSearch(e.target.value);
  };

  const columns = [
    { field: "name", headerName: "Nombre", width: 230 },
    { field: "role", headerName: "Rol", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="icons-container">
            <EditButton params={params} editIconHandler={editIconHandler} />
            <DeleteButton params={params} />
          </div>
        );
      },
    },
  ];

  const toggleSidebar = () => {
    if (!sidebarVisible) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  const showModal = () => {
    setIsEdit(false);
    if (!modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  useEffect(() => {
    getUsers(dispatch);
  }, [isEdit]);

  useEffect(() => {
    if (!search.length) {
      setUsers(usersDetail.usersList);
    }
  }, [search || usersDetail]);

  return (
    <>
      <MenuAppBar handleBtnClick={toggleSidebar} />
      <SideBar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="page-container">
        <div className="page-title">Modulo de Usuarios</div>

        <Grid
          container
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
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
            rows={users}
            columns={columns}
            pemailSize={5}
            rowsPerPemailOptions={[4]}
            getRowId={(row) => row._id}
            sx={{
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              height: 400,
              width: "100%",
              border: "1px solid black",
            }}
          />
        </div>
      </div>

      {modal ? (
        <AddEditModal
          showModal={showModal}
          setCheckAddOrEdit={setIsEdit}
          isEdit={isEdit}
          closeModal={closeModal}
          index={index}
          chargeImg={imageLink}
        />
      ) : null}
    </>
  );
}
