/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/actions";
import { RootState } from "../../store/store";
import { Button, Typography, CircularProgress } from "@mui/material";

const UpdateButton = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.user);

  const handleUpdate = () => {
    const userId = "12345";
    dispatch(fetchUser(userId) as any);
  };

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleUpdate} disabled={loading}>
        {loading ? <CircularProgress size={20} /> : "Update Data"}
      </Button>
      {error && <Typography color='error'>{error}</Typography>}
      {data && <Typography>Data: {JSON.stringify(data)}</Typography>}
    </div>
  );
};

export default UpdateButton;
