import React, { useState } from "react";
import { auth, app } from "../../auth/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const UserAuthentication = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSignIn = async () => {
        try {
            console.log(`Email: ${email}, Password: ${password}`);
            await signInWithEmailAndPassword(auth, email, password);
            setSuccess(true);
            setTimeout(handleClose, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegister = async () => {
        try {
            console.log(`Email: ${email}, Password: ${password}`);
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess(true);
            setTimeout(handleClose, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                style={{ margin: "0 5px", color: "white" }}
                size="large"
                onClick={handleOpen}
            >
                Login/Register
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                    >
                        {success ? "Success!" : "Login/Register"}
                    </Typography>
                    {!success && (
                        <>
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                style={{ margin: "0 10px" }}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default UserAuthentication;
