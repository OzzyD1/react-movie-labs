import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ListItemButton } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const MovieCredits = ({ credits }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "" : "repeat(3, 1fr)",
                    gap: 2,
                }}
            >
                {credits.cast.map((c) => (
                    <List key={c.id}>
                        <Paper sx={{ backgroundColor: "#ededed" }}>
                            <ListItemButton onClick={handleOpen}>
                                <ListItemAvatar>
                                    <Avatar
                                        src={`https://image.tmdb.org/t/p/w92/${c.profile_path}`}
                                        alt=""
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={c.name}
                                    secondary={c.character}
                                />
                            </ListItemButton>
                        </Paper>
                    </List>
                ))}
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default MovieCredits;
