/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Container,
  Grid2,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
// import { ThemeProvider } from "@/theme";
import ToggleTheme from "@/app/components/elements/ToggleTheme";
import { app } from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [successLogin, setSuccessLogin] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const idToken = await credential.user.getIdToken();
      const dataToken = await credential.user.getIdTokenResult();

      // console.log(await credential.user.getIdTokenResult());
      // console.log(idToken);
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${idToken}`,
      //   },
      // });
      const res = await fetch("/api/loginV2", {
        method: "POST",
        body: JSON.stringify({ data: dataToken.claims }),
      });

      setSuccessLogin("Login successful");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (e) {
      setErrorLogin((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToggleTheme />
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login Page
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <LoadingButton
                type="submit"
                loading={isLoading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </LoadingButton>
            </Box>
          </Box>

          <Snackbar
            open={!!errorLogin}
            onClose={() => setErrorLogin(null)}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setErrorLogin(null)}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {errorLogin}
            </Alert>
          </Snackbar>
          <Snackbar
            open={!!successLogin}
            onClose={() => setSuccessLogin(null)}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={() => setSuccessLogin(null)}
              severity="success"
              variant="filled"
              sx={{ width: "100%", color: "white" }}
            >
              {successLogin}
            </Alert>
          </Snackbar>
        </Container>
      </Grid2>
    </>
  );
}
