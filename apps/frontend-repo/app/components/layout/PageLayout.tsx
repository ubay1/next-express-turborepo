/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "@/firebase";
import { useUser } from "@/context/user";
import ToggleTheme from "../elements/ToggleTheme";
import { Alert, Snackbar } from "@mui/material";
import Link from "next/link";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactNode;
}

const pages = [
  { label: "Home", value: "home", path: "/" },
  { label: "User Management", value: "user-management", path: "/user-management" },
];

export default function PageLayout(props: Props) {
  const router = useRouter();
  const { children } = props;
  const { user, name, photoURL, email, setName, setPhotoURL } = useUser();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [loadingLogout, setLoadingLogout] = React.useState(false);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setLoadingLogout(true);
    await signOut(getAuth(app));
    await fetch("/api/logout");

    router.push("/");
    router.push("/login");
  };

  return (
    <>
      <Box>
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Toolbar disableGutters>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <Link href='/' style={{ textDecoration: "none", color: "inherit" }}>
                  eBuddy
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleOpenNavMenu} color='inherit'>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.value}>
                      <Link href={page.path} style={{ textDecoration: "none", color: "inherit" }}>
                        <Typography sx={{ textAlign: "center" }}>{page.label}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant='h5'
                noWrap
                component='div'
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <Link href='/' style={{ textDecoration: "none", color: "inherit" }}>
                  eBuddy
                </Link>
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button key={page.value} LinkComponent={Link} href={page.path} sx={{ my: 2, color: "white", display: "block" }}>
                    {page.label}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <ToggleTheme customStyle={{ position: "relative", top: "0px", color: "white" }} />
                <Tooltip title='Open settings'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={name} src={photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link href={"/profile"} style={{ textDecoration: "none", color: "inherit" }}>
                      <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Box component='main' sx={{ p: 3 }}>
          {children}
        </Box>

        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={loadingLogout}>
          <Alert onClose={() => setLoadingLogout(false)} severity='info' variant='filled' sx={{ width: "100%" }}>
            Please wait logout is being processed ..
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
