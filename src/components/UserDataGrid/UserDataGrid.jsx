import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";
import { Box, Button, Modal, TextField, useMediaQuery } from "@mui/material";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import EditUserModal from "../EditUserModal/EditUserModal";

const UserDataGrid = (props) => {
  const { data } = props;
  const [rows, setRows] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    setRows(data);
  }, [data]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: "age",
      headerName: "Age",
      width: 120,
      editable: false,
      sortable: true,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      sortable: false,
      editable: false,
      width: 200,
    },
    {
      field: "edit",
      headerName: "Edit User",
      sortable: false,
      editable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <button
            className="edit-button"
            onClick={() => {
              setSelectedRow(params?.row);
              setOpenModal(true);
            }}
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete User",
      sortable: false,
      editable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <button
            className="delete-button"
            onClick={() => {
              setOpenConfirmationDialog(true);
              setSelectedRow(params?.row);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const columnsForMobileScreens = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edit User",
      sortable: false,
      editable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <button
            className="edit-button"
            onClick={() => {
              setSelectedRow(params?.row);
              setOpenModal(true);
            }}
          >
            Edit
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete User",
      sortable: false,
      editable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <button
            className="delete-button"
            onClick={() => {
              setOpenConfirmationDialog(true);
              setSelectedRow(params?.row);
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    rows && (
      <Box>
        <DataGrid
          sx={{
            maxWidth: matches ? window.innerWidth * 0.9 : window.innerWidth,
          }}
          {...props}
          rows={rows}
          columns={matches ? columns : columnsForMobileScreens}
        />

        <EditUserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedRow={selectedRow}
        />
        <ConfirmationDialog
          open={openConfirmationDialog}
          setOpen={setOpenConfirmationDialog}
          data={selectedRow}
        />
      </Box>
    )
  );
};

export default UserDataGrid;
