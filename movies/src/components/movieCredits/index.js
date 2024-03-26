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

const MovieCredits = ({ credits }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return isMobile ? (
        <Box
            sx={{
                display: "grid",
            }}
        >
            {credits.cast.map((c) => (
                <List key={c.id}>
                    <Paper sx={{ backgroundColor: "#ededed" }}>
                        <ListItem>
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
                        </ListItem>
                    </Paper>
                </List>
            ))}
        </Box>
    ) : (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
            }}
        >
            {credits.cast.map((c) => (
                <List key={c.id}>
                    <Paper sx={{ backgroundColor: "#ededed" }}>
                        <ListItem>
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
                        </ListItem>
                    </Paper>
                </List>
            ))}
        </Box>
    );
};

export default MovieCredits;
