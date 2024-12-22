"use client";

import { useUser } from "@/context/user";
import { Box, Chip, Stack, Typography } from "@mui/material";

export default function Home() {
  const { name } = useUser();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <Box
        component='img'
        src='https://pantiaisyiyahjogja.org/wp-content/uploads/2016/10/Welcome-Sticky-Note.png'
        alt='Welcome Image'
        sx={{
          width: "100%",
          maxWidth: 500,
          height: "auto",
        }}
      />
      <Typography variant='h4' align='center'>
        Hello {name}, This is a simple project user management system.
      </Typography>
      <Typography variant='body1' align='center'>
        What can you do about it?
      </Typography>

      <Stack direction='row' spacing={1}>
        <Chip label='Create User' color='primary' sx={{ fontWeight: "bold" }} />
        <Chip label='Update User' color='success' sx={{ fontWeight: "bold" }} />
        <Chip label='Delete User' color='error' sx={{ fontWeight: "bold" }} />
        <Chip label='View User' color='info' sx={{ fontWeight: "bold" }} />
        <Chip label='Update Profile' color='warning' sx={{ fontWeight: "bold" }} />
      </Stack>
    </Box>
  );
}
