/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PageLayout from "@/app/components/layout/PageLayout";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Avatar, Box, Snackbar, TextField } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useUser } from "@/context/user";

export default function ProfilePage() {
  const { user, name, photoURL, email, setName, refreshUser } = useUser();

  const [tempPhotoURL, setTempPhotoURL] = useState<string>(photoURL);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorUpdateProfile, setErrorUpdateProfile] = useState<string | null>(null);
  const [successUpdateProfile, setSuccessUpdateProfile] = useState<string | null>(null);

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      await updateProfile(user as any, { displayName: name, photoURL: tempPhotoURL });
      setSuccessUpdateProfile("Profile updated successfully");
      refreshUser();
    } catch (e) {
      setErrorUpdateProfile((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTempPhotoURL(photoURL);
  }, [photoURL]);

  return (
    <PageLayout>
      {/* <Typography variant='h4' sx={{ mb: 4, textAlign: "center" }}>
        Profile
      </Typography> */}
      <Box sx={{ maxWidth: 600, mx: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField id='outlined-basic' disabled label='Email' variant='filled' value={email} />
        <TextField id='outlined-basic' label='Name' variant='filled' value={name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        <Avatar src={photoURL} sx={{ width: 100, height: 100, mx: "auto" }} />
        <TextField id='outlined-basic' label='URL Image' variant='filled' value={tempPhotoURL} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTempPhotoURL(e.target.value)} />

        <LoadingButton variant='contained' onClick={handleUpdateProfile} loading={isLoading}>
          Update Profile
        </LoadingButton>

        <Snackbar open={!!errorUpdateProfile} onClose={() => setErrorUpdateProfile(null)} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={() => setErrorUpdateProfile(null)} severity='error' variant='filled' sx={{ width: "100%" }}>
            {errorUpdateProfile}
          </Alert>
        </Snackbar>
        <Snackbar open={!!successUpdateProfile} onClose={() => setSuccessUpdateProfile(null)} autoHideDuration={3000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
          <Alert onClose={() => setSuccessUpdateProfile(null)} severity='success' variant='filled' sx={{ width: "100%", color: "white" }}>
            {successUpdateProfile}
          </Alert>
        </Snackbar>
      </Box>
    </PageLayout>
  );
}
