import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UserAuthentication from "../authUserModal";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth } from "../../auth/firebase";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, [auth]);

    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const menuOptions = [
        { label: "Home", path: "/" },
        { label: "Now Playing", path: "/movies/nowPlaying" },
        { label: "Popular", path: "/movies/popular" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Watchlist", path: "/movies/watchlist" },
    ];

    const handleMenuSelect = (pageURL) => {
        navigate(pageURL, { replace: true });
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed" style={{ backgroundColor: "#FF595E" }}>
                <Toolbar>
                    <Typography
                        variant="h3"
                        sx={{ flexGrow: 1, paddingLeft: ".2em" }}
                    >
                        OZZYBOXD
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    <MenuItem
                                        key={opt.label}
                                        onClick={() =>
                                            handleMenuSelect(opt.path)
                                        }
                                    >
                                        {opt.label}
                                    </MenuItem>
                                ))}
                                <MenuItem>
                                    <UserAuthentication />
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                <Button
                                    key={opt.label}
                                    color="inherit"
                                    onClick={() => handleMenuSelect(opt.path)}
                                    variant="outlined"
                                    style={{ margin: "0 5px" }}
                                    size="large"
                                >
                                    {opt.label}
                                </Button>
                            ))}
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{ color: "white" }}
                            >
                                {userEmail ? userEmail : <UserAuthentication />}
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
