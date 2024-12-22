/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PageLayout from "@/app/components/layout/PageLayout";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addUser, deleteUser, fetchUserData, updateUser } from "@/apis/userApi";
import { Add, Delete, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  setErrorMsg,
  setLoading,
  setLoadingUpdate,
  setSuccessMsg,
  setUser,
} from "@/app/store/userReducers";
import { User } from "shared";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "email", label: "Email" },
  { id: "name", label: "Name" },
  { id: "age", label: "Age" },
  { id: "action", label: "Action", align: "center" },
];

export default function UserManagement() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [dataEdit, setDataEdit] = useState<Record<string, unknown> | null>(
    null
  );
  const [dataAdd, setDataAdd] = useState<Record<string, unknown>>({
    name: "",
    email: "",
    age: 0,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [typeDialog, setTypeDialog] = useState<string>("add");
  const [idDelete, setIdDelete] = useState<string>("");

  const openDialogAddUser = () => {
    setTypeDialog("add");
    setOpen(true);
  };
  const openDialogEditUser = (dataUser: Record<string, unknown>) => {
    setDataEdit(dataUser);
    setTypeDialog("edit");
    setOpen(true);
  };
  const openDialogDeleteUser = (id: string) => {
    setIdDelete(id);
    setTypeDialog("delete");
    setOpen(true);
  };
  const closeDialog = () => {
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(
    id: string,
    name: string,
    email: string,
    age: number
  ): User {
    return { id, name, email, age };
  }
  const getAllUser = async () => {
    const data = await fetchUserData();
    if (data.length > 0) {
      const rows = data.map((user: any) =>
        createData(user.id, user.name, user.email, user.age)
      );
      dispatch(setUser(rows));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <PageLayout>
      {user.loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={openDialogAddUser}
          >
            <Add />
            Add User
          </Button>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.data &&
                    (user.data as any).length > 0 &&
                    (user.data as any)
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.name}
                          >
                            {columns.map((column) => {
                              const value = row[column.id as keyof typeof row];
                              if (column.id === "action") {
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    <IconButton
                                      onClick={() => openDialogEditUser(row)}
                                    >
                                      <Edit />
                                    </IconButton>
                                    <IconButton
                                      onClick={() =>
                                        openDialogDeleteUser(row.id)
                                      }
                                    >
                                      <Delete />
                                    </IconButton>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={user.data && (user.data as any).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}

      <Dialog
        open={open && typeDialog === "add"}
        disableEscapeKeyDown
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(setLoadingUpdate(true));
            try {
              await addUser({
                name: dataAdd?.name,
                email: dataAdd?.email,
                age: dataAdd?.age,
              });
              closeDialog();
              getAllUser();
              dispatch(setSuccessMsg("Add user successfully"));
            } catch (e) {
              dispatch(setErrorMsg((e as Error).message));
            } finally {
              dispatch(setLoadingUpdate(false));
            }
          },
        }}
      >
        <DialogTitle>Add User Information</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={dataAdd?.name}
            onChange={(e) => setDataAdd({ ...dataAdd, name: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={dataAdd?.email}
            onChange={(e) => setDataAdd({ ...dataAdd, email: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={dataAdd?.age}
            onChange={(e) => setDataAdd({ ...dataAdd, age: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={user.loadingUpdate} onClick={closeDialog}>
            Cancel
          </Button>
          <LoadingButton type="submit" loading={user.loadingUpdate}>
            Add
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && typeDialog === "edit"}
        disableEscapeKeyDown
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(setLoadingUpdate(true));
            try {
              await updateUser(dataEdit?.id as string, {
                name: dataEdit?.name,
                email: dataEdit?.email,
                age: dataEdit?.age,
              });
              closeDialog();
              getAllUser();
              dispatch(setSuccessMsg("Update user successfully"));
            } catch (e) {
              dispatch(setErrorMsg((e as Error).message));
            } finally {
              dispatch(setLoadingUpdate(false));
            }
          },
        }}
      >
        <DialogTitle>Update User Information</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={dataEdit?.name}
            onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value })}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={dataEdit?.email}
            onChange={(e) =>
              setDataEdit({ ...dataEdit, email: e.target.value })
            }
          />
          <TextField
            required
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={dataEdit?.age}
            onChange={(e) => setDataEdit({ ...dataEdit, age: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={user.loadingUpdate} onClick={closeDialog}>
            Cancel
          </Button>
          <LoadingButton type="submit" loading={user.loadingUpdate}>
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open && typeDialog === "delete"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableEscapeKeyDown
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(setLoadingUpdate(true));
            try {
              await deleteUser(idDelete);
              closeDialog();
              getAllUser();
              dispatch(setSuccessMsg("Delete user successfully"));
            } catch (e) {
              dispatch(setErrorMsg((e as Error).message));
            } finally {
              dispatch(setLoadingUpdate(false));
            }
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={user.loadingUpdate} onClick={closeDialog}>
            Disagree
          </Button>
          <LoadingButton type="submit" loading={user.loadingUpdate}>
            Agree
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!user.errorMsg}
        onClose={() => dispatch(setErrorMsg(null))}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(setErrorMsg(null))}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {user.errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!user.successMsg}
        onClose={() => dispatch(setSuccessMsg(null))}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => dispatch(setSuccessMsg(null))}
          severity="success"
          variant="filled"
          sx={{ width: "100%", color: "white" }}
        >
          {user.successMsg}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
}
